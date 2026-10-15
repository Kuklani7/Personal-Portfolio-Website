import { useId, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Minus, Plus } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import Spotlight from "./Spotlight"

export default function ProjectShowcase({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()
  const detailsId = useId()

  return (
    <Spotlight as="article" className={`project-panel project-${project.accent}`} aria-labelledby={`${project.id}-title`}>
      <div className="project-heading-row">
        <p className="project-category">{project.category}</p>
        <span className="project-edition">{project.draft ? "Draft project" : "Featured project"} / {String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 id={`${project.id}-title`} className="project-title">{project.title}</h3>
      <p className="project-intro">{project.description}</p>
      <div className="project-engineering">
        <div>
          <p className="small-label">Engineering focus</p>
          <ul className="project-focus-list">{project.focus.map((focus) => <li key={focus}><span aria-hidden="true">↗</span>{focus}</li>)}</ul>
        </div>
        <div>
          <p className="small-label">Technology stack</p>
          <div className="project-stack">{project.technologies.map((technology) => <span className="badge" key={technology}>{technology}</span>)}</div>
        </div>
      </div>
      {project.problem && <div className="project-verified-block"><h4>The problem</h4><p>{project.problem}</p></div>}
      {project.solution && <div className="project-verified-block"><h4>The approach</h4><p>{project.solution}</p></div>}
      {project.outcomes?.length > 0 && <div className="project-verified-block"><h4>Results & impact</h4><ul>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>}
      <div className="project-detail-row">
        <button type="button" className="project-disclosure" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded((open) => !open)}>
          Technical Details {expanded ? <Minus size={18} /> : <Plus size={18} />}
        </button>
        <div className="project-links">
          {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub size={16} />Source code<ArrowUpRight size={14} /><span className="sr-only"> (opens in a new tab)</span></a>}
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="social-link">Live project<ArrowUpRight size={14} /><span className="sr-only"> (opens in a new tab)</span></a>}
        </div>
      </div>
      <div id={detailsId}>
        <AnimatePresence initial={false}>
          {expanded && <motion.div className="project-details" initial={{ height: reduced ? "auto" : 0, opacity: reduced ? 1 : 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: reduced ? "auto" : 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
            <div className="project-details-inner">
              {project.implementation?.length > 0 ? <><h4>Implementation</h4><ul>{project.implementation.map((item) => <li key={item}>{item}</li>)}</ul></> : <p>This draft currently documents the project summary and listed stack. Architecture, implementation decisions, and measured results have not yet been documented in the portfolio.</p>}
              {project.challenges?.length > 0 && <><h4>Challenges & solutions</h4><ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></>}
              <p className="project-detail-stack">Listed technologies: {project.technologies.join(" · ")}</p>
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </Spotlight>
  )
}
