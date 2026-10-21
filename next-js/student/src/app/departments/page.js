import { departments } from "@/data/students";

export default function DepartmentsPage() {
  return (
    <div>
      <h1>departments</h1>
      <ul>
        {departments.map((d) => (
          <li key={d.slug} style={{ marginBottom: "10px" }}>
            <a href={"/departments/" + d.slug}>{d.name}</a> — {d.description}
          </li>
        ))}
      </ul>
    </div>
  );
}