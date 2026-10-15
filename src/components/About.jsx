import { ChartColumn, Lightbulb, Rocket, Users } from "lucide-react"
import SectionHeading from "./SectionHeading"
import Reveal from "./Reveal"

const highlights = [
  { icon: Lightbulb, title: "Problem Solver", text: "Transforming complex requirements into practical solutions." },
  { icon: Rocket, title: "Continuous Learner", text: "Exploring modern tools, frameworks, and engineering practices." },
  { icon: Users, title: "Team Contributor", text: "Communicating clearly and collaborating across technical teams." },
  { icon: ChartColumn, title: "Data Focused", text: "Using evidence and analytics to support better decisions." },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section refined-section about-section">
      <div className="container-shell about-editorial">
        <Reveal>
          <p className="section-label">01 / A bit about me</p>
          <SectionHeading id="about-heading" className="section-title">Curiosity,<br />backed by code<span className="text-accent">.</span></SectionHeading>
          <p className="about-signoff">Software development meets data analytics.</p>
        </Reveal>
        <div>
          <Reveal className="about-introduction">
            <p>I'm Rachit, a Computer Science student at the <span>University at Buffalo.</span></p>
            <p className="body-copy">I'm interested in software engineering, systems programming, intelligent applications, and automation. I enjoy turning complex engineering challenges into efficient applications and useful solutions.</p>
            <p className="body-copy">For me, that means staying curious, communicating clearly, and understanding the problem before reaching for the tools.</p>
          </Reveal>
          <div className="about-highlights">{highlights.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="article" key={title} delay={index * 0.025} className="about-highlight">
              <Icon size={20} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div>
            </Reveal>
          ))}</div>
        </div>
      </div>
    </section>
  )
}
