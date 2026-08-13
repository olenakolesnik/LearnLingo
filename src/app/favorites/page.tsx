import Container from "@/components/Container/Container";
import FavoritesClient from "@/components/FavoritesClient/FavoritesClient";

import css from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  return (
    <main className={css.page}>
      <Container>
        <FavoritesClient />
      </Container>
    </main>
  );
}