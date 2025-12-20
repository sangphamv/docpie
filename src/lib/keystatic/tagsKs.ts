import { collection, fields } from "@keystatic/core";
import { KEYSTATIC_TAGS } from "@/lib/config";

export const tagsKs = collection({
  label: KEYSTATIC_TAGS.label,
  slugField: "path",
  path: "src/content/tags/*",
  format: { data: "json" },
  schema: {
    title: fields.text({
      label: KEYSTATIC_TAGS.title,
      description: KEYSTATIC_TAGS.description,
    }),
    path: fields.text({
      label: KEYSTATIC_TAGS.path,
      description: KEYSTATIC_TAGS.path_description,
    }),
  },
});
