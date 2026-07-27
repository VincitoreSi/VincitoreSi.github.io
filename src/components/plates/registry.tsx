import type { ReactNode } from 'react'
import PageIndexPlate from './PageIndexPlate'
import TheCuttingRoomPlate from './TheCuttingRoomPlate'
import EchoLearnPlate from './EchoLearnPlate'
import AdaptiveReelsPlate from './AdaptiveReelsPlate'
import NtkPruningPlate from './NtkPruningPlate'
import TableStructurePlate from './TableStructurePlate'
import FacialEmotionPlate from './FacialEmotionPlate'
import ElectronicNosePlate from './ElectronicNosePlate'
import HardwarePatchPlate from './HardwarePatchPlate'
import DbmsNormalizationPlate from './DbmsNormalizationPlate'
import ToxicCommentPlate from './ToxicCommentPlate'
import SketchColorizationPlate from './SketchColorizationPlate'
import CnnOptimizationPlate from './CnnOptimizationPlate'
import CovidDashboardPlate from './CovidDashboardPlate'
import ProcessSchedulingPlate from './ProcessSchedulingPlate'

export type PlateSize = 'card' | 'detail'

const PLATES: Record<string, () => ReactNode> = {
  'pageindex': PageIndexPlate,
  'the-cutting-room': TheCuttingRoomPlate,
  'echolearn': EchoLearnPlate,
  'adaptive-reels': AdaptiveReelsPlate,
  'ntk-pruning': NtkPruningPlate,
  'table-structure-recognition': TableStructurePlate,
  'facial-emotion-recognition': FacialEmotionPlate,
  'electronic-nose': ElectronicNosePlate,
  'hardware-patch-generation': HardwarePatchPlate,
  'dbms-normalization': DbmsNormalizationPlate,
  'toxic-comment-classification': ToxicCommentPlate,
  'sketch-colorization': SketchColorizationPlate,
  'cnn-optimization': CnnOptimizationPlate,
  'covid-dashboard': CovidDashboardPlate,
  'process-scheduling-visualizer': ProcessSchedulingPlate,
}

export function plateFor(slug: string, _size: PlateSize): ReactNode {
  const Component = PLATES[slug]
  return Component ? <Component /> : null
}
