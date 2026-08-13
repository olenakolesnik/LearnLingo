"use client";
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

import css from "./PasswordInput.module.css";

interface PasswordInputProps {
  placeholder?: string;
  registration: UseFormRegisterReturn;
}

export default function PasswordInput({
  placeholder = "Password",
  registration,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={css.wrapper}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={css.input}
        {...registration}
      />

      <button
        type="button"
        className={css.toggle}
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff size={20} strokeWidth={2} />
        ) : (
          <Eye size={20} strokeWidth={2} />
        )}
      </button>
    </div>
  );
}