import css from "./Benefits.module.css";

const benefits = [
  {
    value: "32,000 +",
    label: "Experienced tutors",
  },
  {
    value: "300,000 +",
    label: "5-star tutor reviews",
  },
  {
    value: "120 +",
    label: "Subjects taught",
  },
  {
    value: "200 +",
    label: "Tutor nationalities",
  },
];

export default function Benefits() {
  return (
    <section className={css.benefits}>
      <ul className={css.list}>
        {benefits.map((benefit) => (
          <li className={css.item} key={benefit.label}>
            <span className={css.value}>{benefit.value}</span>

            <span className={css.label}>{benefit.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}