"use client";

import {useEffect, useState} from "react";
import Modal from "@/components/Modal/Modal";
import LoginForm from "@/components/LoginForm/LoginForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import css from "./Header.module.css";
import { useAuthStore } from "@/store/authStore";
import { logoutUser } from "@/services/auth";

export default function Header() {
  const user = useAuthStore((state) => state.user);
const isLoading = useAuthStore((state) => state.isLoading);
  const handleLogout = async () => {
  try {
    await logoutUser();
    closeMenu();
  } catch (error) {
    console.error("Failed to log out:", error);
  }
};
  const [isLoginOpen, setIsLoginOpen] =
  useState(false);

const [
  isRegistrationOpen,
  setIsRegistrationOpen,
] = useState(false); 
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
      <>
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
  {!isLoading && (
    <>
      {user ? (
        <>
          <span className={css.userName}>
            {user.displayName || user.email}
          </span>

          <button
            type="button"
            className={css.logout}
            onClick={handleLogout}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className={css.login}
            onClick={() => setIsLoginOpen(true)}
          >
            <Image
              src="/icons/log-in-01.svg"
              alt=""
              width={20}
              height={20}
            />
            Log in
          </button>

          <button
            type="button"
            className={css.register}
            onClick={() => setIsRegistrationOpen(true)}
          >
            Registration
          </button>
        </>
      )}
    </>
  )}
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

              {user && (
  <Link
    href="/favorites"
    onClick={closeMenu}
  >
    Favorites
  </Link>
)}
            </nav>

            <div className={css.mobileAuth}>
  {user ? (
    <>
      <span className={css.mobileUserName}>
        {user.displayName || user.email}
      </span>

      <button
        type="button"
        className={css.mobileLogout}
        onClick={handleLogout}
      >
        Log out
      </button>
    </>
  ) : (
    <>
      <button
        type="button"
        className={css.mobileLogin}
        onClick={() => {
          closeMenu();
          setIsLoginOpen(true);
        }}
      >
        <Image
          src="/icons/log-in-01.svg"
          alt=""
          width={20}
          height={20}
        />
        Log in
      </button>

      <button
        type="button"
        className={css.mobileRegister}
        onClick={() => {
          closeMenu();
          setIsRegistrationOpen(true);
        }}
      >
        Registration
      </button>
    </>
  )}
</div>
          </div>
        </div>
      )}
      </header>
        {isLoginOpen && (
      <Modal
        onClose={() =>
          setIsLoginOpen(false)
        }
      >
        <LoginForm
          onSuccess={() =>
            setIsLoginOpen(false)
          }
        />
      </Modal>
    )}

    {isRegistrationOpen && (
      <Modal
        onClose={() =>
          setIsRegistrationOpen(false)
        }
      >
        <RegisterForm
          onSuccess={() =>
            setIsRegistrationOpen(false)
          }
        />
      </Modal>
    )}
  </>
  );
}