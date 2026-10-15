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
    <section id="experience" aria-labelledby="experience-heading" className="section refined-section experience-section">
      <div className="container-shell experience-editorial">
        <Reveal>
          <p className="section-label">03 / Professional journey</p>
          <SectionHeading id="experience-heading" className="section-title">Experience<span className="text-accent">.</span></SectionHeading>
          <p className="body-copy mt-5 max-w-sm">A timeline for the roles, responsibilities, and technical work along the way.</p>
          <p className="draft-note">These existing entries are drafts. Company names, dates, and accomplishments still need confirmation.</p>
        </Reveal>
        <TimelineProgress>
          {experiences.map((experience, index) => (
            <Reveal as="article" key={`${experience.company}-${experience.role}`} delay={index * 0.04} className="timeline-item experience-entry">
              <p className="font-mono text-xs text-accent">{experience.company}</p>
              <h3 className="mt-3 text-xl font-medium tracking-tight sm:text-2xl">{experience.role}</h3>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                <span className="flex items-center gap-2"><Calendar size={14} />{experience.period}</span>
                <span className="flex items-center gap-2"><MapPin size={14} />{experience.location}</span>
              </div>
              <p className="body-copy mt-5 text-sm">{experience.description}</p>
              <p className="small-label mt-6">{experience.company === "Company Name" ? "Draft responsibilities" : "Contributions"}</p>
              <ul className="mt-3 space-y-3">
                {experience.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-sm leading-7 text-ink">
                    <CircleCheckBig size={16} className="mt-1.5 shrink-0 text-accent" />{achievement}
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
