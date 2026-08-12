import Container from "@/components/Container/Container";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { teachers } from "@/data/teachers";

export default function TeachersPage() {
  return (
    <main>
      <Container>
        <TeacherCard teacher={teachers[0]} />
      </Container>
    </main>
  );
}