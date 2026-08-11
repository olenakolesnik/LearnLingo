import Image from "next/image";
import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.content}>
        <h1 className={css.title}>
          Unlock your potential with the best{" "}
          <span className={css.accent}>language</span> tutors
        </h1>

        <p className={css.description}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>

        <Link href="/teachers" className={css.button}>
          Get started
        </Link>
      </div>

      <div className={css.imageWrapper}>
        <Image
          src="/images/hero.webp"
          alt="Language student"
          width={568}
          height={530}
          priority
          className={css.image}
        />
      </div>
    </section>
  );
}