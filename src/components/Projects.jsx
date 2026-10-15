import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import SectionHeading from "./SectionHeading"
import Reveal from "./Reveal"
import Magnetic from "./Magnetic"
import ProjectShowcase from "./ProjectShowcase"
import { projects } from "../data/projects"

export default function Projects() {
  const [active, setActive] = useState(0)
  const track = useRef(null)
  const current = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const element = track.current
    let frame = 0
    function update() {
      frame = 0
      const slides = [...element.children]
      let nearest = 0
      let distance = Infinity
      for (let index = 0; index < slides.length; index++) {
        const delta = Math.abs(slides[index].offsetLeft - slides[0].offsetLeft - element.scrollLeft)
        if (delta < distance) { distance = delta; nearest = index }
      }
      if (nearest !== current.current) {
        if (slides[current.current]?.contains(document.activeElement)) element.focus({ preventScroll: true })
        current.current = nearest
        setActive(nearest)
      }
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update) }
    let width = 0
    const resize = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === width) return
      width = entry.contentRect.width
      const slides = element.children
      element.scrollTo({ left: slides[current.current].offsetLeft - slides[0].offsetLeft, behavior: "instant" })
    })
    resize.observe(element)
    element.addEventListener("scroll", onScroll, { passive: true })
    return () => { resize.disconnect(); element.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame) }
  }, [])

  function goTo(index) {
    const next = Math.max(0, Math.min(projects.length - 1, index))
    const slides = track.current.children
    track.current.scrollTo({ left: slides[next].offsetLeft - slides[0].offsetLeft, behavior: reduced ? "instant" : "smooth" })
  }
  function keyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest("button,a,input,textarea,select,summary,[contenteditable]")) return
    const targets = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: projects.length - 1 }
    if (event.key in targets) { event.preventDefault(); goTo(targets[event.key]) }
  }

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section refined-section projects-section">
      <div className="container-shell">
        <Reveal className="editorial-heading">
          <div><p className="section-label">04 / Selected engineering</p><SectionHeading id="projects-heading" className="section-title">A closer look<br />at the work<span className="text-accent">.</span></SectionHeading></div>
          <p className="section-intro">The ideas, tools, and thinking behind the build. Explore one project at a time.</p>
        </Reveal>
        {projects.some((project) => project.draft) && <p className="draft-note">Draft entries retained from the current portfolio. Implementation details and outcomes are included only when documented.</p>}
        <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Featured engineering projects" aria-describedby="project-instructions">
          <div className="project-toolbar">
            <p className="project-counter" aria-hidden="true">{String(active + 1).padStart(2, "0")}<span> / {String(projects.length).padStart(2, "0")}</span></p>
            <div className="project-navigation">
              <Magnetic as="button" type="button" className="project-arrow" aria-label="Previous project" aria-controls="project-track" aria-disabled={active === 0} onClick={() => { if (active > 0) goTo(active - 1) }}><ArrowLeft size={20} /></Magnetic>
              <Magnetic as="button" type="button" className="project-arrow" aria-label="Next project" aria-controls="project-track" aria-disabled={active === projects.length - 1} onClick={() => { if (active < projects.length - 1) goTo(active + 1) }}><ArrowRight size={20} /></Magnetic>
            </div>
          </div>
          <div ref={track} id="project-track" className="project-track" tabIndex={0} role="group" aria-label="Project showcases" aria-describedby="project-instructions" aria-keyshortcuts="ArrowLeft ArrowRight Home End" onKeyDown={keyDown}>
            {projects.map((project, index) => (
              <div key={project.id} className="project-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`} aria-hidden={index !== active} inert={index !== active}>
                <ProjectShowcase project={project} index={index} />
              </div>
            ))}
          </div>
          <div className="project-pagination">
            <p id="project-instructions">Swipe or use the arrows. <span className="keyboard-hint">Focus the projects to use ← / →, Home, or End.</span></p>
            <div className="project-pickers" role="group" aria-label="Choose a project">{projects.map((project, index) => (
              <button type="button" key={project.id} className="project-picker" aria-label={`Show project ${index + 1}: ${project.title}`} aria-pressed={active === index} aria-controls="project-track" onClick={() => goTo(index)}>{String(index + 1).padStart(2, "0")}</button>
            ))}</div>
          </div>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Project {active + 1} of {projects.length}: {projects[active].title}</p>
        </div>
      </div>
    </section>
  )
}
