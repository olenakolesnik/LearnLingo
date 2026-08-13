"use client";

import { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/services/firebase";
import { getFavoriteIds } from "@/services/favorites";
import { useAuthStore } from "@/store/authStore";
import { useFavoritesStore } from "@/store/favoritesStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  const setFavoriteIds = useFavoritesStore(
    (state) => state.setFavoriteIds
  );

  const clearFavorites = useFavoritesStore(
    (state) => state.clearFavorites
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setUser(user);

        if (user) {
          try {
            const favoriteIds = await getFavoriteIds(user.uid);

            setFavoriteIds(favoriteIds);
          } catch (error) {
            console.error(
              "Failed to load favorites:",
              error
            );
          }
        } else {
          clearFavorites();
        }

        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [
    setUser,
    setIsLoading,
    setFavoriteIds,
    clearFavorites,
  ]);

  return children;
}