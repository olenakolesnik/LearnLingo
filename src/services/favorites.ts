import {
  get,
  ref,
  remove,
  set,
} from "firebase/database";

import { database } from "./firebase";

export async function getFavoriteIds(
  userId: string
): Promise<string[]> {
  const favoritesRef = ref(
    database,
    `favorites/${userId}`
  );

  const snapshot = await get(favoritesRef);

  if (!snapshot.exists()) {
    return [];
  }

  return Object.keys(snapshot.val());
}

export async function addFavorite(
  userId: string,
  teacherId: string
) {
  const favoriteRef = ref(
    database,
    `favorites/${userId}/${teacherId}`
  );

  await set(favoriteRef, true);
}

export async function removeFavorite(
  userId: string,
  teacherId: string
) {
  const favoriteRef = ref(
    database,
    `favorites/${userId}/${teacherId}`
  );

  await remove(favoriteRef);
}