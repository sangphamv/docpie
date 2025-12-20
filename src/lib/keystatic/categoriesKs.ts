import { collection, fields } from "@keystatic/core";
import {KEYSTATIC_CATEGORIES} from "@/lib/config"
export const categoriesKs = collection({
  label: KEYSTATIC_CATEGORIES.label,
  slugField: "path",
  path: "src/content/categories/*",
  format: { data: "json" },
  schema: {
    title: fields.text({
      label: KEYSTATIC_CATEGORIES.title,
      description: KEYSTATIC_CATEGORIES.description,
    }),
    path: fields.text({
      label: KEYSTATIC_CATEGORIES.path,
      description: KEYSTATIC_CATEGORIES.path_description,
    }),
  },
});
