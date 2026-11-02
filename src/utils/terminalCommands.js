import { profile } from "../data/profile.js"
import { projects } from "../data/projects.js"
import { skillGroups } from "../data/skills.js"
import { experiences } from "../data/experience.js"

const line = (text, tone = "body", extra = {}) => ({ text, tone, ...extra })
const introduction = () => [
  line(profile.name, "heading"),
  line("Computer Science student at the University at Buffalo"),
  line("Software Engineering · Systems · AI/ML", "accent"),
]
const output = (lines, summary) => ({ lines, summary })

export const terminalCommands = [
  {
    name: "help", description: "Show available commands",
    run: () => output([
      line("A few ways to explore", "heading"),
      ...terminalCommands.map(({ name, description }) => line(description, "body", { label: name })),
      line("↑ / ↓ history · Tab completes a prefix · empty Tab or Shift+Tab moves focus", "info"),
    ], "Available commands and keyboard shortcuts displayed."),
  },
  { name: "whoami", description: "Meet Rachit", run: () => output(introduction(), "Rachit Kuklani, Computer Science student at the University at Buffalo.") },
  {
    name: "about", description: "Read a short introduction",
    run: () => output([
      line("Curiosity, backed by code.", "heading"),
      line("I'm Rachit, a Computer Science student at the University at Buffalo. I'm interested in software engineering, systems programming, intelligent applications, and automation."),
      line("I enjoy understanding complex engineering problems and turning them into efficient applications and useful solutions."),
    ], "Introduction displayed."),
  },
  {
    name: "skills", description: "Explore my technical toolkit",
    run: () => output(skillGroups.flatMap(group => [line(group.title, "label"), line(group.skills.join(" · "))]), `Skills displayed in ${skillGroups.length} categories.`),
  },
  {
    name: "projects", description: "List featured projects",
    run: () => output([
      line("Featured projects", "heading"),
      ...projects.flatMap(project => [line(project.title, "label"), line(`${project.category}${project.draft ? " · Draft entry" : ""}`)]),
      line("Type 'open projects' to take a closer look.", "info"),
    ], `${projects.length} featured projects listed. Draft entries are labeled.`),
  },
  {
    name: "experience", description: "See my professional journey",
    run: () => output(experiences.flatMap(experience => [
      line(experience.role, "label"), line(experience.company), line(experience.period, "info"),
    ]), `${experiences.length} professional experience entries displayed.`),
  },
  {
    name: "contact", description: "Find email and social links",
    run: () => output([
      line("Let's connect", "heading"),
      line(profile.email, "body", { href: `mailto:${profile.email}` }),
      line("GitHub", "body", { href: profile.github, external: true }),
      line("LinkedIn", "body", { href: profile.linkedin, external: true }),
      ...(profile.resumeUrl ? [line("View résumé (PDF)", "body", { href: profile.resumeUrl, external: true })] : []),
    ], "Email, social profiles, and available résumé links displayed."),
  },
  ...["github", "linkedin"].map(name => ({
    name, description: `Open ${name === "github" ? "GitHub" : "LinkedIn"} in a new tab`,
    run: () => ({
      action: "external", href: profile[name],
      lines: [line(name === "github" ? "GitHub profile ↗" : "LinkedIn profile ↗", "body", { href: profile[name], external: true }), line("If a new tab didn't open, follow the link above.", "info")],
      summary: "Profile link available. External links open in a new tab.",
    }),
  })),
  { name: "clear", description: "Clear terminal output", run: () => ({ action: "clear", lines: [], summary: "Terminal output cleared." }) },
  {
    name: "theme", description: "Check the current color theme",
    run: ({ theme }) => output([
      line(`Current theme: ${theme === "dark" ? "Cosmic Plum (dark)" : "Light"}`, "heading"),
      line("Use the sun/moon button in the navbar to switch themes."),
    ], `Current theme is ${theme === "dark" ? "Cosmic Plum dark" : "light"}. Use the navbar sun/moon button to switch.`),
  },
  ...["projects", "skills", "experience", "contact"].map(section => ({
    name: `open ${section}`, description: `Go to the ${section} section`,
    run: () => ({ action: "navigate", section, lines: [line(`Explore ${section} ↓`, "success", { href: `#${section}` })], summary: `Navigating to ${section}.` }),
  })),
]

export function normalizeCommand(value) {
  return value.trim().replace(/\s+/g, " ").toLowerCase()
}

export function interpretCommand(value, context = { theme: "light" }) {
  const normalized = normalizeCommand(value)
  if (!normalized) return null
  // An exact allowlist lookup: user input is always text, never executable code.
  const command = terminalCommands.find(command => command.name === normalized)
  return command ? command.run(context) : output([
    line("Command not found. Type 'help' to see available commands.", "error"),
  ], "Command not found. Type help to see available commands.")
}

export function completeCommand(value) {
  const prefix = normalizeCommand(value)
  if (!prefix) return { matches: [], completion: "" }
  const matches = terminalCommands.map(command => command.name).filter(name => name.startsWith(prefix))
  let completion = matches[0] || ""
  for (const match of matches.slice(1)) {
    while (!match.startsWith(completion)) completion = completion.slice(0, -1)
  }
  return { matches, completion }
}

export function createWelcomeEntry() {
  return { id: 0, command: "whoami", lines: [
    ...introduction(), line("Welcome to my portfolio.", "success"),
    line("Type 'help' to explore, or try a command below.", "info"),
  ] }
}
