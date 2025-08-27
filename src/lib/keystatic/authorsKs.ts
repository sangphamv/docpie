import { collection, fields } from "@keystatic/core";
import { KEYSTATIC_AUTHORS } from "@/lib/config";
export const authorsKs = collection({
  label: KEYSTATIC_AUTHORS.label,
  slugField: "name",
  path: "src/content/authors/*/",
  format: { contentField: "content" },
  entryLayout: "form",
  schema: {
    name: fields.slug({ name: { label: KEYSTATIC_AUTHORS.name } }),
    job: fields.text({ label: KEYSTATIC_AUTHORS.job }),
    avatar: fields.image({
      label: KEYSTATIC_AUTHORS.avatar,
      directory: "src/assets/images/authors",
      publicPath: "@assets/images/authors",
    }),
    bio: fields.text({ label: KEYSTATIC_AUTHORS.bio }),
    social: fields.array(
      fields.object({
        name: fields.text({ label: KEYSTATIC_AUTHORS.social_name, validation: { isRequired: true } }),
        url: fields.url({ label: KEYSTATIC_AUTHORS.social_url, validation: { isRequired: true } }),
        icon: fields.text({ label: KEYSTATIC_AUTHORS.social_icon, validation: { isRequired: true } }),
      }),
      {
        label: KEYSTATIC_AUTHORS.social,
        itemLabel: (props) => props.fields?.name.value ?? "",
      }
    ),
    content: fields.mdx({
      label: KEYSTATIC_AUTHORS.content,
      options: {
        image: {
          directory: "src/assets/images/authors",
          publicPath: "@assets/images/authors",
        },
      },
    }),
  },
});
