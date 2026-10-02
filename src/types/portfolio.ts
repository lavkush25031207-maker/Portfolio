export type PortfolioData = {
  profile: {
    name: string
    role: string
    email: string
    phone: string
    displayPhone: string
    location: string
    resume: string
    portrait: string
    brandMark: string
  }
  navigation: { label: string; id: string }[]
  skillGroups: { icon: string; title: string; skills: string[] }[]
  projects: {
    title: string
    category: string
    type: string
    description: string
    tags: string[]
    details: string[]
    image: string
    liveUrl?: string
    repositoryUrl: string
  }[]
  sections: Record<
    string,
    { eyebrow: string; title: string; description: string } & Record<string, string>
  >
  hero: {
    availability: string
    greeting: string
    roleLead: string
    roleEnd: string
    description: string
    resumeLabel: string
    workLabel: string
    projectCountLabel: string
    scrollLabel: string
    facts: { value: string; label: string }[]
  }
  portrait: Record<string, string>
  about: {
    eyebrow: string
    titleLead: string
    titleEnd: string
    paragraphs: string[]
    traits: string[]
  }
  workExperiences: {
    category: string
    date: string
    title: string
    organization: string
    website?: string
    address?: string
    details: string[]
    tags: string[]
  }[]
  experiences: {
    category: string
    date: string
    title: string
    organization: string
    website?: string
    address?: string
    details: string[]
    tags: string[]
  }[]
  education: { date: string; title: string; organization: string }[]
  gallery: {
    id: string
    title: string
    description: string
    image: string
    date: string
    category: string
  }[]
  contact: Record<string, string>
  socialLinks: { label: string; url: string }[]
  form: Record<string, string>
  footer: Record<string, string>
  projectLabels: Record<string, string>
  artwork: {
    portfolio: Record<string, string>
    shop: { browser: string; title: string; products: string[] }
  }
  ui: Record<string, string>
  metadata: { description: string }
}

export type SkillGroup = PortfolioData['skillGroups'][number]
export type Project = PortfolioData['projects'][number]
export type Experience = PortfolioData['experiences'][number]
