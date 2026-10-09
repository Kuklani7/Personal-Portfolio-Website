import { useState } from "react"
import { CodeXml, Menu, X } from "lucide-react"

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="rounded-lg bg-slate-900 p-2 text-white">
            <CodeXml size={20} />
          </span>
          <span>Your Name</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Me
          </a>
        </div>

        <button
          type="button"
          className="text-slate-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open navigation menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-medium text-slate-600"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar