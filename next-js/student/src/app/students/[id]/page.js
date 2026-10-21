import { notFound } from "next/navigation";
import { getStudent } from "@/data/students";

export default function StudentProfile({ params }) {
  const student = getStudent(params.id);
  if (!student) {
    notFound();
  }
  return (
    <div>
      <h1>{student.name}</h1>
      <p>department {student.department}</p>
      <p> email:  {student.email}</p>
      <p> bio:  {student.bio}</p>
      <p><a href="/students">back to students</a></p>
    </div>
  );
}