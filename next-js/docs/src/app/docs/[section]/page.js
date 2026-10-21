import { notFound } from "next/navigation";
import { getSection, articlesBySection } from "@/data/docs";

export default function SectionPage({ params }) {
  const section = params.section;
  const sec = getSection(section);
  if (!sec) {
    notFound();
  }
  const list = articlesBySection(section);
  return (
    <div>
      <p><a href="/docs">docs</a> / {sec.name}</p>
      <h1>{sec.name}</h1>
      <ul>
        {list.map((a) => (
          <li key={a.slug}>
            <a href={"/docs/" + section + "/" + a.slug}>{a.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}