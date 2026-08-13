"use client";

import { useEffect, useState } from "react";

import TeachersFilters from "@/components/TeachersFilters/TeachersFilters";
import TeachersList from "@/components/TeachersList/TeachersList";

import { getTeachersPage } from "@/services/teachers";
import { Teacher } from "@/types/teacher";

export default function TeachersClient() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const loadInitialTeachers = async () => {
      try {
        const result = await getTeachersPage();

        setTeachers(result.teachers);
        setLastKey(result.lastKey);
        setHasMore(result.hasMore);
      } catch (error) {
        console.error("Failed to load teachers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialTeachers();
  }, []);

  const handleLoadMore = async () => {
    if (!lastKey || isLoadingMore) return;

    try {
      setIsLoadingMore(true);

      const result = await getTeachersPage(lastKey);

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
      <TeachersFilters />

      <TeachersList
        teachers={teachers}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}