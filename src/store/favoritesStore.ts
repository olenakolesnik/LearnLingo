import { create } from "zustand";

interface FavoritesState {
  favoriteIds: string[];
  isLoading: boolean;

  setFavoriteIds: (ids: string[]) => void;
  addFavoriteId: (id: string) => void;
  removeFavoriteId: (id: string) => void;
  setIsLoading: (value: boolean) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore =
  create<FavoritesState>((set) => ({
    favoriteIds: [],
    isLoading: false,

    setFavoriteIds: (ids) =>
      set({ favoriteIds: ids }),

    addFavoriteId: (id) =>
      set((state) => ({
        favoriteIds: [
          ...state.favoriteIds,
          id,
        ],
      })),

    removeFavoriteId: (id) =>
      set((state) => ({
        favoriteIds:
          state.favoriteIds.filter(
            (favoriteId) =>
              favoriteId !== id
          ),
      })),

    setIsLoading: (value) =>
      set({ isLoading: value }),

    clearFavorites: () =>
      set({ favoriteIds: [] }),
  }));