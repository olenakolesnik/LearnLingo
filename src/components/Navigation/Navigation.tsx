"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Navigation.module.css";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className={css.list}>
        <li>
          <Link
            href="/"
            className={pathname === "/" ? css.active : ""}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/teachers"
            className={pathname === "/teachers" ? css.active : ""}
          >
            Teachers
          </Link>
        </li>

        <li>
          <Link
            href="/favorites"
            className={pathname === "/favorites" ? css.active : ""}
          >
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
}