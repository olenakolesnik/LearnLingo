import Container from "@/components/Container/Container";
import TeachersList from "@/components/TeachersList/TeachersList";
import { teachers } from "@/data/teachers";
import css from "./TeachersPage.module.css";
import TeachersFilters from "@/components/TeachersFilters/TeachersFilters";
export default function TeachersPage() {
  return (
    <main className={css.page}>
      <Container>
        <TeachersFilters/>
        <TeachersList teachers={teachers} />
      </Container>
    </main>
  );
}