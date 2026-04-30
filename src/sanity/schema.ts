import { testimonial } from "./schemas/testimonial";
import { faqItem } from "./schemas/faqItem";
import { landingPage } from "./schemas/landingPage";

export const schema = {
  types: [landingPage, testimonial, faqItem],
};
