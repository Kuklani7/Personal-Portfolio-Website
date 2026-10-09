import { motion } from "motion/react"
import {
  ArrowUpRight,
  ChartColumn,
  BrainCircuit,
  CodeXml,
  Database,
  GitBranch,
} from "lucide-react"

const projects = [
  {
    title: "Analytics Dashboard",
    description:
      "A responsive dashboard that transforms operational data into clear metrics and interactive visualizations.",
    technologies: ["React", "REST API", "SQL", "Charts"],
    icon: ChartColumn,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Intelligent Data Assistant",
    description:
      "A data-processing application designed to organize information and provide useful insights through a simple interface.",
    technologies: ["Python", "Pandas", "Database", "AI"],
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Error Logging System",
    description:
      "A centralized system for collecting, storing, and analyzing application or equipment errors.",
    technologies: ["Python", "PostgreSQL", "AWS", "Automation"],
    icon: Database,
    color: "bg-cyan-100 text-cyan-700",
  },
]

function Projects() {
  return (
    <section id="projects" className="border-y border-slate-200 bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="section-label">Selected work</p>
            <h2 className="section-title">Featured projects</h2>
            <p className="mt-5 text-slate-600">
              Placeholder projects demonstrating how the final project cards
              will appear.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
            More projects coming soon
            <CodeXml size={18} />
          </div>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -7 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div
                  className={`mb-6 inline-flex w-fit rounded-xl p-3 ${project.color}`}
                >
                  <Icon size={25} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {project.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-600"
                  >
                    <GitBranch size={17} />
                    Code
                  </button>

                  <button
                    type="button"
                    className="ml-auto flex items-center gap-2 text-sm font-semibold text-blue-600"
                  >
                    Live Demo
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects