import { FaGithub } from "react-icons/fa"
import Reveal from "./Reveal"
import {
  ArrowUpRight,
  ChartColumn,
  BrainCircuit,
  CodeXml,
  Database,
} from "lucide-react"

const projects = [
  {
    title: "Analytics Dashboard",
    description:
      "A responsive dashboard that transforms operational data into clear metrics and interactive visualizations.",
    technologies: ["React", "REST API", "SQL", "Charts"],
    icon: ChartColumn,
  },
  {
    title: "Intelligent Data Assistant",
    description:
      "A data-processing application designed to organize information and provide useful insights through a simple interface.",
    technologies: ["Python", "Pandas", "Database", "AI"],
    icon: BrainCircuit,
  },
  {
    title: "Error Logging System",
    description:
      "A centralized system for collecting, storing, and analyzing application or equipment errors.",
    technologies: ["Python", "PostgreSQL", "AWS", "Automation"],
    icon: Database,
  },
]

function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="section section-alt">
      <div className="container-shell">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-label">04 / Selected work</p>
            <h2 id="projects-heading" className="section-title">Featured projects<span className="text-blue-400">.</span></h2>
            <p className="body-copy mt-5 max-w-xl text-sm">Placeholder projects demonstrating how the final project cards will appear.</p>
          </div>
          <span className="flex items-center gap-2 font-mono text-[11px] text-slate-400"><CodeXml size={16} />More projects coming soon</span>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <Reveal as="article" key={project.title} className="panel interactive-card flex flex-col overflow-hidden">
                <div className="project-art" aria-hidden="true">
                  <span className="absolute left-5 top-4 font-mono text-[10px] text-slate-400">project / 0{index + 1}</span>
                  <Icon size={42} strokeWidth={1.2} className="relative z-10 text-blue-300" />
                  <span className="absolute bottom-3 right-4 font-mono text-[9px] text-slate-400">Concept illustration</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                  <p className="body-copy mt-4 flex-1 text-sm">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">{project.technologies.map((technology) => <span className="badge" key={technology}>{technology}</span>)}</div>
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-700/50 pt-4">
                    {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub size={16} />Code<span className="sr-only"> (opens in a new tab)</span></a>}
                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="social-link">Live Demo<ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a>}
                    {!project.codeUrl && !project.demoUrl && <span className="font-mono text-[10px] text-slate-400">Project links coming soon</span>}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Projects
