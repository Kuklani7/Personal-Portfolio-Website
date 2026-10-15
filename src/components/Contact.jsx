import { ArrowUpRight, Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import SectionHeading from "./SectionHeading"
import Reveal from "./Reveal"
import Magnetic from "./Magnetic"
import { profile } from "../data/profile"

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section refined-section contact-section">
      <div className="container-shell">
        <Reveal className="contact-editorial">
          <div>
            <p className="section-label">05 / Let's connect</p>
            <SectionHeading id="contact-heading" className="section-title">Good things start with a <span className="text-gradient">conversation.</span></SectionHeading>
            <p className="body-copy contact-invitation">I'm always open to discussing software engineering opportunities, collaborating on projects, and connecting with fellow developers. Feel free to reach out through email, LinkedIn, or GitHub.</p>
            <p className="home-availability"><span />Available for new opportunities</p>
          </div>
          <div className="contact-actions">
            <p className="small-label">Have something in mind?</p>
            <a className="contact-address" href={`mailto:${profile.email}`}>{profile.email}</a>
            <Magnetic href={`mailto:${profile.email}`} className="button contact-primary"><Mail size={17} />Let's talk<ArrowUpRight size={17} /></Magnetic>
            <div className="contact-socials">
              <Magnetic href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub size={18} />GitHub<span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={14} /></Magnetic>
              <Magnetic href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin size={18} />LinkedIn<span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={14} /></Magnetic>
            </div>
            <p className="contact-email-note">Email opens your mail app. You can also connect with me on LinkedIn.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
