import { motion } from "motion/react"
import { Lightbulb, Rocket, Users } from "lucide-react"

function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">About me</p>
          <h2 className="section-title">
            Technology, data, and thoughtful problem-solving.
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            This is placeholder text for a professional introduction. Later,
            this section will explain your education, interests, technical
            background, and the kinds of challenges you enjoy solving.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            We will personalize this content after finalizing the overall
            appearance of the portfolio.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              icon: Lightbulb,
              title: "Problem Solver",
              text: "Transforming complex requirements into practical solutions.",
            },
            {
              icon: Rocket,
              title: "Continuous Learner",
              text: "Exploring modern tools, frameworks, and engineering practices.",
            },
            {
              icon: Users,
              title: "Team Contributor",
              text: "Communicating clearly and collaborating across technical teams.",
            },
            {
              icon: BarIcon,
              title: "Data Focused",
              text: "Using evidence and analytics to support better decisions.",
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3 text-blue-600">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BarIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M22 19V3" />
    </svg>
  )
}

export default About