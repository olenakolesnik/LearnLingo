import Container from "@/components/Container/Container";
import css from "./TeachersPage.module.css";
import TeachersClient from "@/components/TeachersClient/TeachersClient";
export default function TeachersPage() {
  return (
    <main className={css.page}>
      <Container>
       <TeachersClient />
      </Container>
    </main>
  );
}