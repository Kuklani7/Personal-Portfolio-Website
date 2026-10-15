import { Braces, Cloud, Database, ChartLine } from "lucide-react"
import SectionHeading from "./SectionHeading"
import Reveal from "./Reveal"
import Spotlight from "./Spotlight"

const skillGroups = [
  { title: "Programming languages", icon: Braces, skills: ["JavaScript", "Python", "Java"] },
  { title: "Frameworks & web", icon: Cloud, skills: ["React", "Node.js", "ASP.NET", "HTML5", "CSS3", "Tailwind CSS", "REST APIs"] },
  { title: "Databases & cloud", icon: Database, skills: ["SQL", "PostgreSQL", "MySQL", "AWS RDS", "Data Modeling"] },
  { title: "Data & analytics", icon: ChartLine, skills: ["Pandas", "Data Cleaning", "Visualization", "Reporting", "Excel"] },
]

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section refined-section skills-section">
      <div className="container-shell">
        <Reveal className="editorial-heading">
          <div><p className="section-label">02 / The toolkit</p><SectionHeading id="skills-heading" className="section-title">Different tools.<br />Thoughtful solutions.</SectionHeading></div>
          <p className="section-intro">The technologies that connect software and data. Grouped by what they help build.</p>
        </Reveal>
        <p className="draft-note">The existing toolkit list is draft content and will be refined to reflect the final technical stack.</p>
        <div className="refined-skill-grid">{skillGroups.map(({ title, icon: Icon, skills: technologies }, index) => (
          <Reveal key={title} delay={index * 0.025}>
            <Spotlight as="article" className="refined-skill skill-card">
              <div className="refined-skill-top"><span className="skill-symbol"><Icon size={23} /></span><span className="small-label">0{index + 1}</span></div>
              <h3>{title}</h3>
              <div className="refined-skill-tags">{technologies.map((technology) => <span className="badge" key={technology}>{technology}</span>)}</div>
            </Spotlight>
          </Reveal>
        ))}</div>
      </div>
    </section>
  )
}
