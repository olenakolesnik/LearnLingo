import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { Teacher } from "@/types/teacher";

import css from "./TeachersList.module.css";

interface TeachersListProps {
  teachers: Teacher[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

export default function TeachersList({
  teachers,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: TeachersListProps) {
  if (teachers.length === 0) {
    return (
      <p className={css.empty}>
        No teachers found matching your filters.
      </p>
    );
  }

  return (
    <>
      <ul className={css.list}>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className={css.loadMore}
          onClick={onLoadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}