"use client";

import { useEffect, useRef, useState } from "react";
import css from "./CustomSelect.module.css";

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  formatOption?: (option: string) => string;
}

export default function CustomSelect({
  label,
  value,
  options,
  placeholder,
  onChange,
  formatOption,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel = value
    ? formatOption
      ? formatOption(value)
      : value
    : placeholder;

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={css.field} ref={selectRef}>
      <label className={css.label}>{label}</label>

      <button
        type="button"
        className={`${css.control} ${isOpen ? css.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>

        <span className={css.arrow}>⌄</span>
      </button>

      {isOpen && (
        <div className={css.dropdown}>
          {options.map((option) => (
            <button
              type="button"
              key={option}
              className={`${css.option} ${
                option === value ? css.active : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {formatOption ? formatOption(option) : option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}