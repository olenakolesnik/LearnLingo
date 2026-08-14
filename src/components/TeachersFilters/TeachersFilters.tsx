"use client";

import { useState } from "react";
import css from "./TeachersFilters.module.css";
import { Filters } from "@/types/filters";


interface TeachersFiltersProps {
  onChange?: (filters: Filters) => void;
}

const languages = [
  "English",
  "French",
  "German",
  "Spanish",
  "Italian",
  "Mandarin Chinese",
  "Korean",
  "Vietnamese",
];

const levels = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
    "B2 Upper-Intermediate",
    "C1 Advanced",
  "C2 Proficient",
];

const prices = ["10", "20", "30", "40"];

export default function TeachersFilters({
  onChange,
}: TeachersFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    language: "",
    level: "",
    price: "",
  });

  const handleChange = (
    key: keyof Filters,
    value: string
  ) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };

    setFilters(updatedFilters);
    onChange?.(updatedFilters);
  };

  return (
    <div className={css.filters}>
      <div className={css.field}>
        <label
          htmlFor="language"
          className={css.label}
        >
          Languages
        </label>

        <select
          id="language"
          value={filters.language}
          onChange={(event) =>
            handleChange("language", event.target.value)
          }
          className={css.select}
        >
          <option value="">All languages</option>

          {languages.map((language) => (
            <option
              value={language}
              key={language}
            >
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className={css.field}>
        <label
          htmlFor="level"
          className={css.label}
        >
          Level of knowledge
        </label>

        <select
          id="level"
          value={filters.level}
          onChange={(event) =>
            handleChange("level", event.target.value)
          }
          className={css.select}
        >
          <option value="">All levels</option>

          {levels.map((level) => (
            <option
              value={level}
              key={level}
            >
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className={css.field}>
        <label
          htmlFor="price"
          className={css.label}
        >
          Price
        </label>

        <select
          id="price"
          value={filters.price}
          onChange={(event) =>
            handleChange("price", event.target.value)
          }
          className={`${css.select} ${css.priceSelect}`}
        >
          <option value="">All prices</option>

          {prices.map((price) => (
            <option
              value={price}
              key={price}
            >
              {price} $
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}