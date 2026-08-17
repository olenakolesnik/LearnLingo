"use client";

import { useState } from "react";
import css from "./TeachersFilters.module.css";
import { Filters } from "@/types/filters";
import CustomSelect from "../CustomSelect/CustomSelect";

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
      <CustomSelect
        label="Languages"
        value={filters.language}
        options={languages}
        placeholder="All languages"
        onChange={(value) =>
          handleChange("language", value)
        }
      />

      <CustomSelect
        label="Level of knowledge"
        value={filters.level}
        options={levels}
        placeholder="All levels"
        onChange={(value) =>
          handleChange("level", value)
        }
      />

      <CustomSelect
        label="Price"
        value={filters.price}
        options={prices}
        placeholder="All prices"
        onChange={(value) =>
          handleChange("price", value)
        }
        formatOption={(price) => `${price} $`}
      />
    </div>
  );
}