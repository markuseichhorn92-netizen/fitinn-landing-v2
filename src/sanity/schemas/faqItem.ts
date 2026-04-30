import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ-Eintrag",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Frage", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Antwort", type: "text", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Reihenfolge", type: "number" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
