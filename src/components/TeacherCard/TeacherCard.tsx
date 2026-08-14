"use client";

import Image from "next/image";
import { Teacher } from "@/types/teacher";
import css from "./TeacherCard.module.css";
import { useState } from "react";
import {
  addFavorite,
  removeFavorite,
} from "@/services/favorites";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { Heart } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import BookingForm from "@/components/BookingForm/BookingForm";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({
  teacher,
}: TeacherCardProps) {
  const user = useAuthStore(
  (state) => state.user
);

const favoriteIds = useFavoritesStore(
  (state) => state.favoriteIds
);

const addFavoriteId = useFavoritesStore(
  (state) => state.addFavoriteId
);

const removeFavoriteId =
  useFavoritesStore(
    (state) => state.removeFavoriteId
  );


const isFavorite =
  favoriteIds.includes(teacher.id);  
  const handleFavorite = async () => {
 if (!user) {
  toast.error(
    "Please log in to add teachers to favorites."
  );

  return;
}

  try {

    if (isFavorite) {
      await removeFavorite(
        user.uid,
        teacher.id
      );

      removeFavoriteId(teacher.id);
    } else {
      await addFavorite(
        user.uid,
        teacher.id
      );

      addFavoriteId(teacher.id);
    }
  } catch (error) {
    console.error(
      "Failed to update favorites:",
      error
    );
  }
};
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] =
  useState(false);
  return (
    <>
    <article className={css.card}>
      <div className={css.avatarWrapper}>
        <Image
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width={96}
          height={96}
          className={css.avatar}
        />

        <span className={css.online}></span>
      </div>

      <div className={css.content}>
        <div className={css.top}>
          <div>
            <p className={css.label}>Languages</p>

            <h2 className={css.name}>
              {teacher.name} {teacher.surname}
            </h2>
          </div>

                  <div className={css.stats}>
                      <span className={css.statItem}>
                      <Image
                                    src="/icons/book-open-01.svg"
                                    alt="Lessons online"
                                    width={16}
                                    height={16}
                                    priority
                                  />
            Lessons online</span>

            <span className={css.divider}></span>

            <span>
              Lessons done: {teacher.lessons_done}
            </span>

            <span className={css.divider}></span>
 <span className={css.statItem}>
                      <Image
                                    src="/icons/star.svg"
                                    alt="Rating"
                                    width={16}
                                    height={16}
                                    priority
                                  />
            
               Rating: {teacher.rating}
            </span>

            <span className={css.divider}></span>

            <span>
              Price / 1 hour:{" "}
              <strong className={css.price}>
                {teacher.price_per_hour}$
              </strong>
            </span>
          </div>

          <button
  type="button"
  className={css.favoriteButton}
  onClick={handleFavorite}
  aria-label={
    isFavorite
      ? "Remove from favorites"
      : "Add to favorites"
  }
>
  <Heart
    size={26}
    strokeWidth={2}
    fill={isFavorite ? "var(--color-primary)" : "none"}
    color={isFavorite ? "var(--color-primary)" : "currentColor"}
  />
</button>
        </div>

        <div className={css.info}>
          <p>
            <span className={css.infoLabel}>Speaks: </span>

            <span className={css.languages}>
              {teacher.languages.join(", ")}
            </span>
          </p>

          <p>
            <span className={css.infoLabel}>
              Lesson Info:{" "}
            </span>

            {teacher.lesson_info}
          </p>

          <p>
            <span className={css.infoLabel}>
              Conditions:{" "}
            </span>

            {teacher.conditions.join(". ")}
          </p>
        </div>

        <button
          type="button"
          className={css.readMore}
 onClick={() => setIsExpanded((prev) => !prev)}
>
  {isExpanded ? "Show less" : "Read more"}
        </button>
{isExpanded && (
  <div className={css.details}>
    <p className={css.experience}>
      {teacher.experience}
    </p>

    <ul className={css.reviews}>
      {teacher.reviews.map((review, index) => (
        <li key={`${review.reviewer_name}-${index}`} className={css.review}>
          <div className={css.reviewHeader}>
            <div className={css.reviewAvatar}>
              {review.reviewer_name.charAt(0)}
            </div>

            <div>
              <p className={css.reviewerName}>
                {review.reviewer_name}
              </p>

              <div className={css.reviewRating}>
                <Image
                  src="/icons/star.svg"
                  alt=""
                  width={16}
                  height={16}
                />

                <span>{review.reviewer_rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <p className={css.reviewComment}>
            {review.comment}
          </p>
        </li>
      ))}
    </ul>
  </div>
)}
        <ul className={css.levels}>
          {teacher.levels.map((level, index) => (
            <li
              key={level}
              className={`${css.level} ${
                index === 0 ? css.activeLevel : ""
              }`}
            >
              #{level}
            </li>
          ))}
              </ul>
              {isExpanded && (
  <button
    type="button"
    className={css.bookButton}
  onClick={() => setIsBookingOpen(true)}
          >
    Book trial lesson
  </button>
        )}
    
      </div>
    </article>
        {isBookingOpen && (
  <Modal
    onClose={() => setIsBookingOpen(false)}
  >
    <BookingForm
      teacher={teacher}
      onSuccess={() => setIsBookingOpen(false)}
    />
  </Modal>
      )}
      </>
  );
}