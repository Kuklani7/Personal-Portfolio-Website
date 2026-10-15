import SectionHeading from "./SectionHeading"
import Reveal from "./Reveal"
import TimelineProgress from "./TimelineProgress"
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
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <div className="container-shell grid gap-4 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="section-label">03 / Professional journey</p>
          <SectionHeading id="experience-heading" className="section-title">Experience<span className="text-blue-400">.</span></SectionHeading>
          <p className="body-copy mt-5 max-w-sm">A timeline of the roles, responsibilities, and results that shaped my technical experience.</p>
        </Reveal>
        <TimelineProgress>
          {experiences.map((experience, index) => (
            <Reveal as="article" key={`${experience.company}-${experience.role}`} delay={index * 0.04} className="timeline-item panel p-6 sm:p-8">
              <p className="font-mono text-xs text-blue-300">{experience.company}</p>
              <h3 className="mt-3 text-xl font-medium tracking-tight sm:text-2xl">{experience.role}</h3>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="flex items-center gap-2"><Calendar size={14} />{experience.period}</span>
                <span className="flex items-center gap-2"><MapPin size={14} />{experience.location}</span>
              </div>
              <p className="body-copy mt-5 text-sm">{experience.description}</p>
              <ul className="mt-5 space-y-3 border-t border-slate-700/50 pt-5">
                {experience.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-sm leading-7 text-slate-300">
                    <CircleCheckBig size={16} className="mt-1.5 shrink-0 text-blue-400" />{achievement}
                  </li>
                ))}
              </ul>
              {experience.technologies?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">{experience.technologies.map((technology) => <span className="badge" key={technology}>{technology}</span>)}</div>
              )}
            </Reveal>
          ))}
        </TimelineProgress>
      </div>
    </section>
  )
}
export default Experience
