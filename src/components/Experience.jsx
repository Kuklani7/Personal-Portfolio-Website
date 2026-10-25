import SectionHeading from "./SectionHeading"
import Reveal from "./Reveal"
import TimelineProgress from "./TimelineProgress"
import { Calendar, CircleCheckBig, MapPin } from "lucide-react"

const experiences = [
  {
    role: "Software and Data Analytics Intern",
    company: "Biz Analytix",
    location: "New York City",
    period: "May 2026 — Aug 2026",
    description:
      "Responsive analytics applications and database-backed services built with React and .NET.",
    achievements: [
      "Built responsive analytics pages in React and a database-backed service layer using .NET Framework and MVC architecture. Replaced legacy workflows with reusable API-driven components, reducing development time by 40%.",
      "Refactored SQL and LINQ queries with streamlined filtering and aggregation, accelerating data retrieval and improving React page-rendering speed by 65%.",
    ],
    technologies: ["ASP.NET MVC", "React", ".NET Framework", "JavaScript", "SQL Server", "LINQ"],
  },
  {
    role: "Teaching Assistant — Algorithms and Complexity",
    company: "University at Buffalo — School of Engineering and Applied Sciences",
    location: "Buffalo, NY",
    period: "Aug 2025 — Present",
    description:
      "Algorithm implementation, code review, and mentoring, supported by automated grading and testing workflows.",
    achievements: [
      "Debugged and optimized student implementations of graph algorithms and dynamic programming, using NumPy vectorization to help students achieve 2–5× faster runtimes.",
      "Conducted 60+ in-depth C/C++ code reviews and mentored students on pointer arithmetic, manual memory management, and POSIX threads, helping 95% of mentees achieve zero memory leaks.",
      "Automated grading scripts and testing workflows, reducing grading time per submission by approximately 70%.",
    ],
    technologies: ["Python", "Java", "C", "NumPy", "MySQL"],
  },
  {
    role: "Software Engineering Intern",
    company: "Kuksons Electronics",
    location: "Mumbai, India",
    period: "May 2025 — Aug 2025",
    description:
      "Monitoring dashboards and centralized fault logging for industrial automation.",
    achievements: [
      "Developed a responsive React dashboard to monitor project status and inventory for ongoing automation tasks, giving engineers real-time visibility and reducing manual status tracking by 40%.",
      "Built a centralized PLC error-logging pipeline using Python, PostgreSQL, and AWS RDS to capture runtime faults across production lines, reducing troubleshooting time by 35% and enabling root-cause analysis of 40+ daily errors.",
    ],
    technologies: ["AWS RDS", "React", "Node.js", "SCADA", "Siemens TIA Portal", "PostgreSQL", "Python"],
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
              <p className="small-label mt-6">Contributions</p>
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
