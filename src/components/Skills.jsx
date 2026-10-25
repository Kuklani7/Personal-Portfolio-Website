import { Braces, Brain, Layers, Database, Terminal, Workflow } from "lucide-react"
import SectionHeading from "./SectionHeading"
import Reveal from "./Reveal"
import Spotlight from "./Spotlight"
import { skillGroups } from "../data/skills"

const icons = { languages: Braces, "machine-learning": Brain, frameworks: Layers, databases: Database, systems: Terminal, concepts: Workflow }

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section refined-section skills-section">
      <div className="container-shell">
        <Reveal className="editorial-heading">
          <div><p className="section-label">02 / The toolkit</p><SectionHeading id="skills-heading" className="section-title">Different tools.<br />Thoughtful solutions.</SectionHeading></div>
          <p className="section-intro">From systems programming to intelligent applications. The languages, libraries, and engineering foundations in my toolkit.</p>
        </Reveal>
        <div className="refined-skill-grid">
          {skillGroups.map(({ id, title, description, skills }, index) => {
            const Icon = icons[id]
            return (
              <Reveal key={id} delay={index * 0.025}>
                <Spotlight as="article" className={`refined-skill skill-card skill-category-${id}`} aria-labelledby={`skill-${id}-heading`}>
                  <div className="refined-skill-top">
                    <span className="skill-symbol" aria-hidden="true"><Icon size={23} /></span>
                    <span className="small-label" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <h3 id={`skill-${id}-heading`}>{title}</h3>
                  <p className="skill-description">{description}</p>
                  <ul className="refined-skill-tags" aria-label={`${title} skills`}>
                    {skills.map((skill) => <li className="badge" key={skill}>{skill}</li>)}
                  </ul>
                </Spotlight>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
