import { notFound } from "next/navigation";
import { getSection, getArticle } from "@/data/docs";

export const instant = false;

export default async function ArticlePage({ params }) {
  const { section, article } = await params;
  const sec = getSection(section);
  const art = getArticle(section, article);
  if (!sec || !art) {
    notFound();
  }
  return (
    <div>
      <p>
        <a href="/docs">docs</a> / <a href={"/docs/" + section}>{sec.name}</a> / {art.title}
      </p>
      <h1>{art.title}</h1>
      <p>{art.content}</p>
    </div>
  );
}