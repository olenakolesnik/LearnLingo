"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  loginSchema,
  LoginFormValues,
} from "@/schemas/loginSchema";

import { loginUser } from "@/services/auth";

import css from "./LoginForm.module.css";
import PasswordInput from "../PasswordInput/PasswordInput";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({
  onSuccess,
}: LoginFormProps) {
  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (
    values: LoginFormValues
  ) => {
    try {
      setServerError("");

      await loginUser(
        values.email,
        values.password
      );

      onSuccess();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setServerError(
          "Incorrect email or password"
        );
      } else {
        setServerError(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div>
      <h2 className={css.title}>Log In</h2>

      <p className={css.description}>
        Welcome back! Please enter your
        credentials to access your account
        and continue your search for a teacher.
      </p>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={css.field}>
          <input
            type="email"
            placeholder="Email"
            className={css.input}
            {...register("email")}
          />

          {errors.email && (
            <p className={css.error}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className={css.field}>
          <PasswordInput
  registration={register("password")}
/>

          {errors.password && (
            <p className={css.error}>
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <p className={css.serverError}>
            {serverError}
          </p>
        )}

        <button
          type="submit"
          className={css.submit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Logging in..."
            : "Log In"}
        </button>
      </form>
    </div>
  );
}