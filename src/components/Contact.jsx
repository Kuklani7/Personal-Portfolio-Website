import SectionHeading from "./SectionHeading"
import { ArrowUpRight, Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Reveal from "./Reveal"
import { profile } from "../data/profile"

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="container-shell">
        <Reveal className="panel contact-panel grid gap-10 p-7 sm:p-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-20 lg:p-16">
          <div>
            <p className="section-label">05 / Let's connect</p>
            <SectionHeading id="contact-heading" className="section-title">Interested in working <span className="text-gradient">together?</span></SectionHeading>
            <p className="body-copy mt-6 max-w-lg">
              I'm always open to discussing software engineering opportunities,
              collaborating on projects, and connecting with fellow developers.
              Feel free to reach out through email, LinkedIn, or GitHub.
            </p>
            <div className="availability mt-7"><span className="availability-dot" />Available for new opportunities</div>
          </div>
          <div className="min-w-0">
            <p className="mb-3 font-mono text-xs text-muted">Start a conversation</p>
            <a href={`mailto:${profile.email}`} className="contact-email">
              <span className="icon-box"><Mail size={21} /></span>
              <span className="min-w-0 flex-1"><span className="mb-1 block text-xs text-muted">Email me</span><span className="break-all text-sm font-medium text-ink sm:text-base">{profile.email}</span></span>
              <ArrowUpRight className="shrink-0 text-accent" size={18} />
            </a>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="button button-secondary"><FaGithub size={18} />GitHub<span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={14} /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="button button-secondary"><FaLinkedin size={18} />LinkedIn<span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={14} /></a>
            </div>
            <p className="mt-4 text-xs leading-6 text-muted">Email opens your mail app. Prefer a browser? Connect with me on LinkedIn.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
export default Contact
