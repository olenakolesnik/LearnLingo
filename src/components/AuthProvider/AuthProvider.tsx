"use client";

import { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/services/firebase";
import { useAuthStore } from "@/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore(
    (state) => state.setIsLoading
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [setUser, setIsLoading]);

  return children;
}