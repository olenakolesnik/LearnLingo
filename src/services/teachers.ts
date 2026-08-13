import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";

import { database } from "./firebase";
import { Teacher } from "@/types/teacher";

const PAGE_SIZE = 4;

export interface TeachersPageResult {
  teachers: Teacher[];
  lastKey: string | null;
  hasMore: boolean;
}

export async function getTeachersPage(
  lastKey: string | null = null
): Promise<TeachersPageResult> {
  const teachersRef = ref(database, "/");

  const teachersQuery = lastKey
    ? query(
        teachersRef,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(PAGE_SIZE + 1)
      )
    : query(
        teachersRef,
        orderByKey(),
        limitToFirst(PAGE_SIZE + 1)
      );

  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) {
    return {
      teachers: [],
      lastKey: null,
      hasMore: false,
    };
  }

  const loadedTeachers: Teacher[] = [];

  snapshot.forEach((childSnapshot) => {
    loadedTeachers.push({
      id: childSnapshot.key,
      ...(childSnapshot.val() as Omit<Teacher, "id">),
    });
  });

  const hasMore = loadedTeachers.length > PAGE_SIZE;

  const teachers = hasMore
    ? loadedTeachers.slice(0, PAGE_SIZE)
    : loadedTeachers;

  return {
    teachers,
    lastKey:
      teachers.length > 0
        ? teachers[teachers.length - 1].id
        : null,
    hasMore,
  };
}
export async function getTeachersByIds(
  ids: string[]
): Promise<Teacher[]> {
  if (ids.length === 0) {
    return [];
  }

  const requests = ids.map(async (id) => {
    const teacherRef = ref(database, id);
    const snapshot = await get(teacherRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.key,
      ...(snapshot.val() as Omit<Teacher, "id">),
    };
  });

  const results = await Promise.all(requests);

  return results.filter(
    (teacher): teacher is Teacher => teacher !== null
  );
}