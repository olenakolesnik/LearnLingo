"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import {
  bookingSchema,
  BookingFormValues,
} from "@/schemas/bookingSchema";

import { Teacher } from "@/types/teacher";

import css from "./BookingForm.module.css";

interface BookingFormProps {
  teacher: Teacher;
  onSuccess: () => void;
}

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

export default function BookingForm({
  teacher,
  onSuccess,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = async (
    values: BookingFormValues
  ) => {
    console.log("Booking:", {
      ...values,
      teacherId: teacher.id,
    });

    toast.success("Trial lesson booked successfully.");

    onSuccess();
  };

  return (
    <div>
      <h2 className={css.title}>
        Book trial lesson
      </h2>

      <p className={css.description}>
        Our experienced tutor will assess your
        current language level, discuss your
        learning goals, and tailor the lesson
        to your specific needs.
      </p>

      <div className={css.teacher}>
        <Image
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width={44}
          height={44}
          className={css.avatar}
        />

        <div>
          <p className={css.teacherLabel}>
            Your teacher
          </p>

          <p className={css.teacherName}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            What is your main reason for learning English?
          </legend>

          <div className={css.radioList}>
            {reasons.map((reason) => (
              <label
                key={reason}
                className={css.radioLabel}
              >
                <input
                  type="radio"
                  value={reason}
                  {...register("reason")}
                />

                <span>{reason}</span>
              </label>
            ))}
          </div>

          {errors.reason && (
            <p className={css.error}>
              {errors.reason.message}
            </p>
          )}
        </fieldset>

        <div className={css.field}>
          <input
            type="text"
            placeholder="Full Name"
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
          <input
            type="tel"
            placeholder="Phone number"
            className={css.input}
            {...register("phone")}
          />

          {errors.phone && (
            <p className={css.error}>
              {errors.phone.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={css.submit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Booking..."
            : "Book"}
        </button>
      </form>
    </div>
  );
}