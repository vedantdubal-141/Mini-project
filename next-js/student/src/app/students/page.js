import { students } from "@/data/students";

export default function StudentsPage() {
  return (
    <div>
      <h1>students</h1>
      <ul>
        {students.map((s) => (
          <li key={s.id} style={{ marginBottom: "10px" }}>
            <a href={"/students/" + s.id}>{s.name}</a> — {s.department}
          </li>
        ))}
      </ul>
    </div>
  );
}