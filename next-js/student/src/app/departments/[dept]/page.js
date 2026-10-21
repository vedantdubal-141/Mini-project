import { notFound } from "next/navigation";
import { getDepartment, studentsByDepartment } from "@/data/students";

export default async function DepartmentPage({ params }) {
  const { dept } = await params;
  const department = getDepartment(dept);
  if (!department) {
    notFound();
  }
  const list = studentsByDepartment(dept);
  return (
    <div>
      <h1>{department.name}</h1>
      <p>{department.description}</p>
      <h2>students</h2>
      {list.length === 0 ? (
        <p>no student .</p>
      ) : (
        <ul>
          {list.map((s) => (
            <li key={s.id}>
              <a href={"/students/" + s.id}>{s.name}</a>
            </li>
          ))}
        </ul>
      )}
      <p><a href="/departments">back  to departments</a></p>
    </div>
  );
}