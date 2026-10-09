import { motion } from "motion/react"
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
    <section id="skills" className="border-y border-slate-200 bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Technical toolkit</p>
          <h2 className="section-title">Skills that connect software and data</h2>
          <p className="mt-5 text-slate-600">
            These are placeholder skills that we will replace with your exact
            technical stack.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = group.icon

            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-slate-900 p-3 text-white">
                    <Icon size={23} />
                  </div>
                  <h3 className="text-lg font-bold">{group.title}</h3>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills