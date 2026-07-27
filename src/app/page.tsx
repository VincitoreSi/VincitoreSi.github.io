import Masthead from '@/components/Masthead'
import Lede from '@/components/Lede'
import Section from '@/components/Section'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Technical from '@/components/Technical'
import Certifications from '@/components/Certifications'
import WorkTeaser from '@/components/WorkTeaser'
import Colophon from '@/components/Colophon'

export default function Home() {
  return (
    <main className="shell">
      <Masthead />
      <Lede />
      <Section number="01" title="Experience"><Experience /></Section>
      <Section number="02" title="Education"><Education /></Section>
      <Section number="03" title="Technical"><Technical /></Section>
      <Section number="04" title="Certifications"><Certifications /></Section>
      <WorkTeaser />
      <Colophon />
    </main>
  )
}
