"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import TeacherCard from "@/components/TeacherCard/TeacherCard";

import { getTeachersByIds } from "@/services/teachers";

import { useAuthStore } from "@/store/authStore";
import { useFavoritesStore } from "@/store/favoritesStore";

import { Teacher } from "@/types/teacher";

import css from "./FavoritesClient.module.css";

export default function FavoritesClient() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore(
    (state) => state.isLoading
  );

  const favoriteIds = useFavoritesStore(
    (state) => state.favoriteIds
  );

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user) {
      router.replace("/teachers");
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (isAuthLoading || !user) {
      return;
    }

    const loadFavorites = async () => {
      try {
        setIsLoading(true);

        const data = await getTeachersByIds(favoriteIds);

        setTeachers(data);
      } catch (error) {
        console.error(
          "Failed to load favorite teachers:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [user, isAuthLoading, favoriteIds]);

  const favoriteTeachers = useMemo(
    () =>
      teachers.filter((teacher) =>
        favoriteIds.includes(teacher.id)
      ),
    [teachers, favoriteIds]
  );

  if (isAuthLoading || isLoading) {
    return (
      <p className={css.message}>
        Loading...
      </p>
    );
  }

  if (!user) {
    return null;
  }

  if (favoriteTeachers.length === 0) {
    return (
      <div className={css.empty}>
        <span className={css.heart}>♡</span>

        <h1 className={css.title}>
          No favorite teachers yet
        </h1>

        <p className={css.text}>
          Add teachers to your favorites and they
          will appear here.
        </p>

        <Link
          href="/teachers"
          className={css.button}
        >
          Browse teachers
        </Link>
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {favoriteTeachers.map((teacher) => (
        <li key={teacher.id}>
          <TeacherCard teacher={teacher} />
        </li>
      ))}
    </ul>
  );
}