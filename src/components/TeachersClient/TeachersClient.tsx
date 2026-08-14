"use client";

import { useEffect, useMemo, useState } from "react";

import TeachersFilters from "@/components/TeachersFilters/TeachersFilters";
import TeachersList from "@/components/TeachersList/TeachersList";

import {
  getAllTeachers,
  getTeachersPage,
} from "@/services/teachers";

import { Teacher } from "@/types/teacher";
import { Filters } from "@/types/filters";

const initialFilters: Filters = {
  language: "",
  level: "",
  price: "",
};

export default function TeachersClient() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);

  const [filters, setFilters] =
    useState<Filters>(initialFilters);

  const [lastKey, setLastKey] =
    useState<string | null>(null);

  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isLoadingMore, setIsLoadingMore] =
    useState(false);
  const hasActiveFilters =
    filters.language !== "" ||
    filters.level !== "" ||
    filters.price !== "";

  useEffect(() => {
    const loadInitialTeachers = async () => {
      try {
        const result = await getTeachersPage();

        setTeachers(result.teachers);
        setLastKey(result.lastKey);
        setHasMore(result.hasMore);
      } catch (error) {
        console.error(
          "Failed to load teachers:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialTeachers();
  }, []);

  useEffect(() => {
    if (!hasActiveFilters || allTeachers.length > 0) {
      return;
    }

    const loadAllTeachers = async () => {
      try {
        const data = await getAllTeachers();

        setAllTeachers(data);
      } catch (error) {
        console.error(
          "Failed to load teachers for filtering:",
          error
        );
      }
    };

    loadAllTeachers();
  }, [hasActiveFilters, allTeachers.length]);
    
  const filteredTeachers = useMemo(() => {
      if (!hasActiveFilters) {
    return teachers;
  }
  return allTeachers.filter((teacher) => {
    const matchesLanguage =
      !filters.language ||
      (Array.isArray(teacher.languages) &&
        teacher.languages.includes(filters.language));

   const matchesLevel =
  !filters.level ||
  (Array.isArray(teacher.levels) &&
    teacher.levels.some(
      (level) =>
        level.trim().toLowerCase() ===
        filters.level.trim().toLowerCase()
    ));
    const matchesPrice =
      !filters.price ||
      teacher.price_per_hour === Number(filters.price);

    return (
      matchesLanguage &&
      matchesLevel &&
      matchesPrice
    );
  });
}, [
  teachers,
  allTeachers,
  filters,
  hasActiveFilters,
]);
  const handleLoadMore = async () => {
    if (
      !lastKey ||
      isLoadingMore ||
      hasActiveFilters
    ) {
      return;
    }

    try {
      setIsLoadingMore(true);

      const result =
        await getTeachersPage(lastKey);

      setTeachers((prev) => [
        ...prev,
        ...result.teachers,
      ]);

      setLastKey(result.lastKey);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error(
        "Failed to load more teachers:",
        error
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
          <TeachersFilters onChange={setFilters}
         />

      <TeachersList
        teachers={filteredTeachers}
        hasMore={!hasActiveFilters && hasMore}
        isLoadingMore={isLoadingMore}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}