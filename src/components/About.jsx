import SectionHeading from "./SectionHeading"
import { ChartColumn, Lightbulb, Rocket, Users } from "lucide-react"
import Reveal from "./Reveal"

const highlights = [
  { icon: Lightbulb, title: "Problem Solver", text: "Transforming complex requirements into practical solutions." },
  { icon: Rocket, title: "Continuous Learner", text: "Exploring modern tools, frameworks, and engineering practices." },
  { icon: Users, title: "Team Contributor", text: "Communicating clearly and collaborating across technical teams." },
  { icon: ChartColumn, title: "Data Focused", text: "Using evidence and analytics to support better decisions." },
]

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="container-shell grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <p className="section-label">01 / About me</p>
          <SectionHeading id="about-heading" className="section-title">Technology, data, and thoughtful problem-solving.</SectionHeading>
          <p className="body-copy mt-6">I am a developer and data professional who enjoys creating responsive applications, reliable systems, and insightful analytics.</p>
          <p className="body-copy mt-4">My focus is on developing efficient applications and intelligent solutions, with a passion for solving complex engineering challenges.</p>
          <div className="mt-7 flex items-center gap-3 border-t border-slate-700/50 pt-6 font-mono text-xs text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />Software development meets data analytics.</div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map(({ icon: Icon, title, text }) => (
            <Reveal as="article" key={title} className="panel interactive-card p-6">
              <span className="icon-box mb-5"><Icon size={20} /></span>
              <h3 className="text-lg font-medium tracking-tight">{title}</h3>
              <p className="body-copy mt-2 text-sm">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
export default About
