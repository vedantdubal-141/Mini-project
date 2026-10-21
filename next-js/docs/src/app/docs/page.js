import { sections } from "@/data/docs";

export default function DocsHome() {
  return (
    <div>
      <h1>docs</h1>
      <ul>
        {sections.map((s) => (
          <li key={s.slug}>
            <a href={"/docs/" + s.slug}>{s.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}