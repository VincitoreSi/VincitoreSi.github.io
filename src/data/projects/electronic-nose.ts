import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'electronic-nose',
  summary:
    'Gas classification and concentration prediction from 10,000+ sensor readings, running entirely on a Raspberry Pi with ThingSpeak integration.',
  plateCaption:
    'Sensor array → PCA/LDA/t-SNE feature extraction → gas type classifier + concentration regressor → live dashboard.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'A metal oxide gas sensor does not answer the question you actually want answered. It gives a resistance change that moves with the gas, with the concentration, with temperature, and with whatever else is in the chamber at the time. Two sensors exposed to ethylene, to acetone, and to a mixture of the two produce three overlapping clouds of readings rather than three clean signatures.',
        'So the system has to do two different jobs from the same pair of numbers. First decide which gas is present — one of the two pure gases or the mixture. Then estimate how much of it there is, in ppm, which for the mixture means two numbers instead of one. A single model does not fit that shape, because concentration only means something once you know what you are measuring.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'The project is the whole path from the bench to a prediction, not just the model. Sensor readings are taken in the lab, a Raspberry Pi pushes them to a ThingSpeak channel in real time, and the accumulated data becomes the CSV the models are trained from. The upload is deliberately plain: an HTTP GET against the ThingSpeak update endpoint with a write API key and one field per sensor column, so the Pi needs nothing beyond the requests library.',
        'From the CSV the pipeline splits in two directions. One branch is inspection — PCA, LDA, and t-SNE projections down to two dimensions, plotted so you can see whether the classes separate at all before spending time on classifiers. The other branch is training: a gas type classifier, then a concentration regressor chosen by the classifier output. A Streamlit app sits over both, and is what was deployed.',
      ],
      diagram: `flowchart LR
  S[Sensor array]
  P[Raspberry Pi]
  T[ThingSpeak channel]
  C[CSV dataset]
  F[PCA LDA tSNE projections]
  K[Gas type classifier]
  R[Concentration regressor]
  D[Streamlit app]
  S-->P
  P-->T
  T-->C
  C-->F
  C-->K
  K-->R
  R-->D
  F-->D`,
    },
    {
      heading: 'Building the dataset',
      body: [
        'Lab collection is slow, so the measured rows are few. interpolate.py expands each recorded row into eleven by copying it ten times and adding uniform noise to both sensor channels and to the ppm value. The mixture rows store concentration as a string of the form value plus value, so the noise function detects that case, perturbs each component separately, and writes the pair back in the same encoding. Later, when a regressor is trained on the mixture class, that string is split into two independent targets.',
        'Loading is uniform after that. The last two columns of the CSV are the label and the concentration; everything before them is sensor input. The dimension reduction step takes the sensor columns and the class labels and writes three scatter plots — PCA fitted without labels, LDA fitted with them, t-SNE for the non-linear view — which is how the separability question gets answered before any classifier runs.',
        'A second, much larger path exists for the public UCI mixture recordings, where ethylene with carbon monoxide and ethylene with methane are concatenated into one array, labelled zero and one, and scaled with MaxAbsScaler before the split. That branch is what the early binary classification work was built on.',
      ],
      diagram: `flowchart LR
  A[Lab reading rows]
  B["Noise expansion, eleven rows each"]
  C[Expanded CSV]
  D[Sensor columns]
  E[GasType label]
  F[ppm target]
  G[PCA LDA tSNE plots]
  H[Train test split]
  A-->B
  B-->C
  C-->D
  C-->E
  C-->F
  D-->G
  E-->G
  D-->H
  E-->H
  F-->H`,
    },
    {
      heading: 'Model layer',
      body: [
        'Every model is a subclass of one of two BaseModel classes, one for classification and one for regression. The base class owns the loop — fit the estimator while timing it, predict on the held-out split while timing that, compute the metrics, and dump the fitted estimator to joblib. A subclass supplies only the constructed scikit-learn estimator and a name. Adding a classifier is a file with a constructor in it.',
        'That uniformity is what makes the comparison honest. Ten classifiers are trained the same way on the same split: KNN, linear SVC, logistic regression, Gaussian naive Bayes, decision tree, random forest, extra trees, AdaBoost, KNN wrapped in bagging, and a hard-voting ensemble over logistic regression, a decision tree, a linear SVC, and a 30-neighbour KNN. Each writes both a raw and a row-normalised confusion matrix image, so a model that looks fine on accuracy but collapses one class into another is visible immediately.',
        'The regression side reports mean absolute error, mean squared error, median absolute error, R2, explained variance, max error, and mean squared log error, because a concentration estimate that is usually close but occasionally very wrong is a different failure from one that is uniformly mediocre, and a single score hides that. Five regressors are compared: linear, Bayesian ridge, elastic net, SVR, and SGD.',
        'main.py runs the whole set as separate module invocations, each redirecting its stdout into a per-model text file under output. There is no experiment tracker; the run log is a directory of text files and confusion matrix images that can be read directly.',
      ],
      diagram: `flowchart TD
  M[main.py]
  B[BaseModel run]
  T[Fit and time]
  E[Score on held out split]
  CM[Confusion matrix images]
  L[Text log per model]
  J[joblib artefact]
  M-->B
  B-->T
  T-->E
  E-->CM
  E-->L
  B-->J`,
    },
    {
      heading: 'Result',
      body: [
        'Prediction at serving time is two stages, and the second depends on the first. The Streamlit testing tab takes the sensor values, runs the classifier to get a class, and uses that class to choose which regressor file to load — the regressors are trained per gas, so their filenames carry the class index. If the class is the mixture, two regressors are loaded instead of one and both concentrations are reported, which is the same split that was introduced when the mixture ppm string was separated during training.',
        'The training tab in the same app closes the loop: upload a CSV, name the classes, pick a projection to look at, train any of the classifiers or regressors from the browser, and download the resulting joblib file. The deployed app is the interface to the pipeline rather than a demo bolted onto it.',
      ],
      diagram: `sequenceDiagram
  participant U as User
  participant A as Streamlit app
  participant K as Classifier
  participant R as Regressor store
  U->>A: sensor values
  A->>K: predict gas type
  K-->>A: class index and name
  A->>R: load regressor for that class
  R-->>A: ppm estimate
  A-->>U: gas name and concentration
  Note over A,R: mixture class loads two regressors`,
    },
  ],
  metrics: [
    { value: '10,000+', label: 'sensor readings' },
    { value: 'Raspberry Pi', label: 'edge deployment' },
  ],
  stackFull: [
    'Python',
    'Scikit-learn',
    'Raspberry Pi',
    'ThingSpeak',
    'Streamlit',
    'pandas',
    'Matplotlib',
    'joblib',
  ],
}

export default detail
