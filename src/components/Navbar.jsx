import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, CodeXml, Menu, X } from "lucide-react"
import { profile } from "../data/profile"

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
]
const sectionIds = ["home", "about", "skills", "experience", "projects", "contact"]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const menuButton = useRef(null)
  const header = useRef(null)

  useEffect(() => {
    let frame = 0
    function updateSection() {
      let current = "home"
      for (const id of sectionIds) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= 150) current = id
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) current = "contact"
      setActiveSection(current)
      frame = 0
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateSection)
    }
    updateSection()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false)
        menuButton.current?.focus()
      }
    }
    function onPointerDown(event) {
      if (!header.current?.contains(event.target)) setIsOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 768px)")
    function onResize() { if (desktop.matches) setIsOpen(false) }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    desktop.addEventListener("change", onResize)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      desktop.removeEventListener("change", onResize)
    }
  }, [isOpen])

  return (
    <header ref={header} className="site-header" onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
    }}>
      <nav aria-label="Main navigation" className="container-shell flex h-[76px] items-center justify-between gap-4">
        <a href="#home" onClick={() => setIsOpen(false)} className="brand-link">
          <span className="brand-mark" aria-hidden="true"><CodeXml size={19} /></span>
          <span>{profile.name}<span className="brand-dot" aria-hidden="true">.</span></span>
        </a>
        <div className="hidden items-center gap-1 md:flex lg:gap-3">
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? "location" : undefined} className="nav-link">{link.name}</a>
          ))}
          <a href="#contact" aria-current={activeSection === "contact" ? "location" : undefined} className="button button-primary nav-contact ml-3">Contact Me <ArrowUpRight size={15} /></a>
        </div>
        <button ref={menuButton} type="button" className="menu-toggle" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen} aria-controls="mobile-navigation">
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!isOpen} className="mobile-nav md:hidden">
        <div className="container-shell flex flex-col gap-1">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} aria-current={activeSection === link.href.slice(1) ? "location" : undefined} className="nav-link rounded-md px-3">{link.name}</a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} aria-current={activeSection === "contact" ? "location" : undefined} className="button button-primary mt-3">Contact Me <ArrowUpRight size={16} /></a>
        </div>
      </nav>
    </header>
  )
}
export default Navbar
