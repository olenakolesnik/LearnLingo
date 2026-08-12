import { Teacher } from "@/types/teacher";

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Maria",
    surname: "Peterson",
    languages: ["English", "Spanish"],
    levels: ["A1 Beginner", "A2 Elementary", "B1 Intermediate"],
    rating: 4.8,
    reviews: [
      {
        reviewer_name: "Anna",
        reviewer_rating: 5,
        comment:
          "Maria is a wonderful teacher. Her lessons are very interesting and helpful.",
      },
    ],
    price_per_hour: 25,
    lessons_done: 1378,
    avatar_url: "/images/teachers/maria.jpg",
    lesson_info: "Lessons are focused on speaking and practical language use.",
    conditions: [
      "Kids & adults",
      "All levels",
    ],
    experience:
      "I have been teaching languages for more than 8 years and work with students from different countries.",
  },
];