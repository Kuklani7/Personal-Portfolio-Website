// Shared timings are in seconds for Motion; matching CSS tokens live in tokens.css.
export const duration = { micro: 0.18, hover: 0.26, section: 0.56, hero: 0.7, theme: 0.35, project: 0.32 }
export const ease = { out: [0.22, 1, 0.36, 1], soft: [0.4, 0, 0.2, 1] }
export const springs = {
  pointer: { stiffness: 110, damping: 27 },
  glow: { stiffness: 100, damping: 25 },
  timeline: { stiffness: 150, damping: 30 },
}
export const settled = { opacity: 1, x: 0, y: 0 }
export const fadeUp = {
  settled,
  enter: (delay = 0) => ({ opacity: [0, 1], y: [20, 0], transition: { duration: duration.section, delay: Math.min(delay, 0.24), ease: ease.out } }),
}
export const stagger = {
  settled: {},
  enter: { transition: { staggerChildren: 0.06 } },
}
export const badgeReveal = {
  settled,
  enter: { opacity: [0, 1], y: [5, 0], transition: { duration: 0.36, ease: ease.out } },
}
export const heroStage = {
  settled,
  enter: (index = 0) => ({ opacity: [0, 1], y: [12, 0], transition: { duration: 0.5, delay: [0, 0, 0, 0.52, 0.6][index] || 0, ease: ease.out } }),
}
export const heroCopy = {
  settled,
  enter: (index = 0) => ({ opacity: [0, 1], y: [12, 0], transition: { duration: 0.5, delay: index === 0 ? 0.34 : 0.43, ease: ease.out } }),
}
export const heroName = {
  settled,
  enter: (index = 0) => ({ opacity: [0, 1], y: [24, 0], transition: { duration: duration.hero, delay: 0.09 + index * 0.11, ease: ease.out } }),
}
export const projectSequence = {
  settled: {},
  active: { transition: { staggerChildren: 0.035 } },
  inactive: { transition: { staggerChildren: 0.012 } },
}
export const projectTitle = {
  settled,
  active: { opacity: [0.5, 1], x: [12, 0], transition: { duration: 0.38, ease: ease.out } },
  inactive: { opacity: 0.55, x: -8, transition: { duration: duration.micro, ease: ease.soft } },
}
export const projectCopy = {
  settled,
  active: { opacity: [0.6, 1], y: [5, 0], transition: { duration: duration.project, ease: ease.out } },
  inactive: { opacity: 0.6, y: 0, transition: { duration: duration.micro } },
}
export const projectBadge = {
  settled,
  active: { opacity: [0.5, 1], y: [4, 0], transition: { duration: duration.project, ease: ease.out } },
  inactive: { opacity: 0.6, y: 0, transition: { duration: duration.micro } },
}
