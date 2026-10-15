import SectionHeading from "./SectionHeading"
import Reveal from "./Reveal"
import { Braces, Cloud, Database, ChartLine } from "lucide-react"

const skillGroups = [
  {
    title: "Frontend Development",
    icon: Braces,
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    icon: Cloud,
    skills: ["Node.js", "REST APIs", "ASP.NET", "Python", "Java"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["SQL", "PostgreSQL", "MySQL", "AWS RDS", "Data Modeling"],
  },
  {
    title: "Data & Analytics",
    icon: ChartLine,
    skills: ["Pandas", "Data Cleaning", "Visualization", "Reporting", "Excel"],
  },
]

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section section-alt">
      <div className="container-shell">
        <Reveal>
          <p className="section-label">02 / Technical toolkit</p>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading id="skills-heading" className="section-title max-w-2xl">Skills that connect software and data.</SectionHeading>
            <p className="body-copy max-w-xs text-sm">These are placeholder skills that we will replace with your exact technical stack.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = group.icon
            return (
              <Reveal as="article" key={group.title} delay={index * 0.025} className="skill-card panel interactive-card p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="icon-box"><Icon size={21} /></span>
                  <span aria-hidden="true" className="font-mono text-xs text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-medium tracking-tight">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => <span key={skill} className="badge">{skill}</span>)}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Skills
