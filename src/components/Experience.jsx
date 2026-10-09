import { motion } from "motion/react"
import { Calendar, CircleCheckBig, MapPin } from "lucide-react"

const experiences = [
  {
    role: "Software & Data Analytics Intern",
    company: "Company Name",
    location: "City, State",
    period: "Month Year — Present",
    description:
      "Placeholder summary describing your responsibilities and the purpose of your work.",
    achievements: [
      "Built responsive software features for a business application.",
      "Improved data-processing and reporting workflows.",
      "Collaborated with engineers and business stakeholders.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Company Name",
    location: "City, State",
    period: "Month Year — Month Year",
    description:
      "Placeholder summary describing your technical experience and contributions.",
    achievements: [
      "Developed and tested reusable application components.",
      "Worked with databases, APIs, and automation systems.",
      "Documented technical solutions and project outcomes.",
    ],
  },
]

function Experience() {
  return (
    <section id="experience" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="section-label">Professional journey</p>
          <h2 className="section-title">Experience</h2>
          <p className="mt-5 text-slate-600">
            A timeline of the roles, responsibilities, and results that shaped
            my technical experience.
          </p>
        </div>

        <div className="relative mt-14 space-y-8 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-px before:bg-slate-200 md:before:left-1/2">
          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${experience.role}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative ml-12 rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm md:ml-0 md:w-[46%] ${
                index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              }`}
            >
              <span
                className={`absolute top-8 h-4 w-4 rounded-full border-4 border-white bg-blue-600 ${
                  index % 2 === 0
                    ? "-left-10 md:-right-[12.8%] md:left-auto"
                    : "-left-10 md:-left-[12.8%]"
                }`}
              />

              <p className="text-sm font-semibold text-blue-600">
                {experience.company}
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {experience.role}
              </h3>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} />
                  {experience.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {experience.location}
                </span>
              </div>

              <p className="mt-5 leading-7 text-slate-600">
                {experience.description}
              </p>

              <ul className="mt-5 space-y-3">
                {experience.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex gap-3 text-sm leading-6 text-slate-600"
                  >
                    <CircleCheckBig
                      size={17}
                      className="mt-1 shrink-0 text-blue-600"
                    />
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience