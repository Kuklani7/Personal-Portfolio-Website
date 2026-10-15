import { ArrowDown, ArrowRight, ArrowUpRight, FileText } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { motion, useReducedMotion } from "motion/react"
import HeroIntro from "./HeroIntro"
import AmbientHero from "./AmbientHero"
import HeroVisual from "./HeroVisual"
import InteractiveName from "./InteractiveName"
import Magnetic from "./Magnetic"
import { profile } from "../data/profile"
import "../styles/home.css"

function Hero() {
  const reduced = useReducedMotion()

  return (
    <AmbientHero>
      <div className="container-shell home-layout">
        <HeroIntro className="home-intro">
          <p className="home-kicker">SOFTWARE ENGINEERING <span>·</span> SYSTEMS <span>·</span> AI/ML</p>
          <InteractiveName />
          <div className="home-copy">
            <p className="home-tagline">Building intelligent software that solves real-world problems.</p>
            <p className="home-description">
              I'm a Computer Science student at the University at Buffalo, interested
              in software engineering, systems programming, automation, and intelligent applications.
            </p>
          </div>
          <div className="home-actions">
            <Magnetic href="#projects" className="button home-button home-primary">View Work <ArrowRight size={17} /></Magnetic>
            <Magnetic href="#contact" className="button home-button home-secondary">Contact Me <ArrowUpRight size={16} /></Magnetic>
            {profile.resumeUrl ? (
              <Magnetic href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="home-resume">
                <FileText size={16} />Resume <ArrowUpRight size={14} /><span className="sr-only"> (opens in a new tab)</span>
              </Magnetic>
            ) : (
              <Magnetic href={`mailto:${profile.email}?subject=Resume%20request`} className="home-resume">
                <FileText size={16} />Request résumé <ArrowUpRight size={14} />
              </Magnetic>
            )}
          </div>
          <div className="home-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub size={17} />GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin size={17} />LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </HeroIntro>

        <motion.div className="home-sculpture"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.12 }}>
          <HeroVisual />
          <p className="home-sculpture-caption">A little curiosity, in motion.</p>
        </motion.div>

        <div className="home-bottomline">
          <p className="home-availability"><span />Available for new opportunities</p>
          <a href="#about" className="home-scroll">Scroll to explore <ArrowDown size={14} /></a>
        </div>
      </div>
    </AmbientHero>
  )
}
export default Hero
