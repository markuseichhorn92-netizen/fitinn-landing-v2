import { defineField, defineType } from "sanity";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Überschrift", type: "string" }),
        defineField({ name: "subheadline", title: "Unterüberschrift", type: "text" }),
        defineField({ name: "ctaLabel", title: "CTA-Button Text", type: "string" }),
      ],
    }),
    defineField({
      name: "problem",
      title: "Problem-Section",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Überschrift", type: "string" }),
        defineField({ name: "subheadline", title: "Unterüberschrift", type: "text" }),
      ],
    }),
    defineField({
      name: "solution",
      title: "Solution-Section",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Überschrift", type: "string" }),
        defineField({ name: "subheadline", title: "Unterüberschrift", type: "text" }),
      ],
    }),
    defineField({
      name: "guarantee",
      title: "Garantie-Section",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Überschrift", type: "string" }),
        defineField({ name: "body", title: "Text", type: "text" }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Social Proof Statistiken",
      type: "object",
      fields: [
        defineField({ name: "participants", title: "Teilnehmer-Zahl", type: "string" }),
        defineField({ name: "avgKgLoss", title: "Ø Gewichtsabnahme (kg)", type: "number" }),
        defineField({ name: "avgCmLoss", title: "Ø Bauchumfang-Abnahme (cm)", type: "number" }),
        defineField({ name: "rating", title: "Bewertung", type: "number" }),
        defineField({ name: "ratingCount", title: "Anzahl Bewertungen", type: "number" }),
      ],
    }),
  ],
});
