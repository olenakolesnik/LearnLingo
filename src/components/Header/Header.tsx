"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import css from "./Header.module.css";

export default function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
    return (
    <header className={css.header}>
      <Container>
        <div className={css.wrapper}>
          <Link href="/" className={css.logo}>
            <Image
              src="/icons/ukraine.svg"
              alt="LearnLingo logo"
              width={28}
              height={28}
              priority
            />

            <span>LearnLingo</span>
          </Link>
<div className={css.navigation}>
          <Navigation />
</div>
          <div className={css.auth}>
            <button type="button" className={css.login}>
              <Image
              src="/icons/log-in-01.svg"
              alt="Log in"
              width={20}
              height={20}
              priority
            />
              Log in
            </button>

            <button type="button" className={css.register}>
              Registration
            </button>
                    </div>
               <button
            type="button"
            className={css.burger}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>      
        </div>
            </Container>
             {isMenuOpen && (
        <div className={css.backdrop} onClick={closeMenu}>
          <div
            className={css.mobileMenu}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={css.closeButton}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>

            <nav className={css.mobileNav}>
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>

              <Link href="/teachers" onClick={closeMenu}>
                Teachers
              </Link>

              <Link href="/favorites" onClick={closeMenu}>
                Favorites
              </Link>
            </nav>

            <div className={css.mobileAuth}>
              <button type="button" className={css.mobileLogin}>
                <Image
                  src="/icons/log-in-01.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                Log in
              </button>

              <button type="button" className={css.mobileRegister}>
                Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}