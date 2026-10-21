export const sections = [
  { slug: "getting-started", name: "getting started" },
  { slug: "guides", name: "guides" }
];

export const articles = [
  { slug: "intro", section: "getting-started", title: "intro", content: "welcome to the docs." },
  { slug: "install", section: "getting-started", title: "install", content: "run npm install." },
  { slug: "routing", section: "guides", title: "routing", content: "use app router." }
];

export function getSection(slug) {
  return sections.find((s) => s.slug === slug);
}

export function getArticle(section, slug) {
  return articles.find((a) => a.section === section && a.slug === slug);
}

export function articlesBySection(section) {
  return articles.filter((a) => a.section === section);
}