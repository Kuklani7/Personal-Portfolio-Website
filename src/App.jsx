import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import { MotionConfig } from "motion/react"
import "./styles/refinements.css"
import "./styles/theme.css"

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell min-h-screen">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App
