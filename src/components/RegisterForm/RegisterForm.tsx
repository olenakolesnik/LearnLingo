"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  registerSchema,
  RegisterFormValues,
} from "@/schemas/registerSchema";

import { registerUser } from "@/services/auth";

import css from "./RegisterForm.module.css";
import PasswordInput from "../PasswordInput/PasswordInput";

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({
  onSuccess,
}: RegisterFormProps) {
  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (
    values: RegisterFormValues
  ) => {
    try {
      setServerError("");

      await registerUser(
        values.name,
        values.email,
        values.password
      );

      onSuccess();
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        setServerError(
          "This email is already registered"
        );

        return;
      }

      setServerError(
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h2 className={css.title}>
        Registration
      </h2>

      <p className={css.description}>
        Thank you for your interest in our
        platform! In order to register, we
        need some information. Please provide
        us with the following information.
      </p>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={css.field}>
          <input
            type="text"
            placeholder="Name"
            className={css.input}
            {...register("name")}
          />

          {errors.name && (
            <p className={css.error}>
              {errors.name.message}
            </p>
          )}
        </div>

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
            ? "Creating account..."
            : "Sign Up"}
        </button>
      </form>
    </div>
  );
}