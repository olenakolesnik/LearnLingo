"use client";

import { useState } from "react";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { Teacher } from "@/types/teacher";
import css from "./TeachersList.module.css";

interface TeachersListProps {
  teachers: Teacher[];
}

const ITEMS_PER_PAGE = 4;

export default function TeachersList({
  teachers,
}: TeachersListProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleTeachers = teachers.slice(0, visibleCount);

  const hasMore = visibleCount < teachers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <ul className={css.list}>
        {visibleTeachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className={css.loadMore}
          onClick={handleLoadMore}
        >
          Load more
        </button>
      )}
    </>
  );
}