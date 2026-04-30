import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "age", title: "Alter", type: "number" }),
    defineField({ name: "location", title: "Ort", type: "string" }),
    defineField({ name: "quote", title: "Zitat", type: "text", validation: (r) => r.required() }),
    defineField({ name: "kgLoss", title: "Gewichtsabnahme (kg)", type: "number" }),
    defineField({ name: "cmLoss", title: "Bauchumfang-Abnahme (cm)", type: "number" }),
    defineField({ name: "rating", title: "Bewertung (1–5)", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "order", title: "Reihenfolge", type: "number" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
