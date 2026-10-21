
export const departments = [
  { slug: "cs", name: "cs", description: "computer and science" },
  { slug: "ec", name: "ec", description: "electrical" },
  { slug: "mc", name: "mc", description: "mathematics and computing" }
];

export const students = [
  { id: "1", name: "x", department: "cs", email: "x@example.com" },
  { id: "2", name: "y", department: "ec", email: "y@example.com" },
  { id: "3", name: "z", department: "mc", email: "z@example.com" }
];

export function getStudent(id) {
  return students.find((s) => s.id === id);
}

export function getDepartment(slug) {
  return departments.find((d) => d.slug === slug);
}

export function studentsByDepartment(slug) {
  return students.filter((s) => s.department === slug);
}
