import { collection, fields } from "@keystatic/core";
import { KEYSTATIC_ARTICLES } from "@/lib/config";
export const articlesKs = collection({
  label: KEYSTATIC_ARTICLES.label,
  slugField: "title",
  path: "src/content/articles/*/",
  format: { contentField: "content" },
  entryLayout: "form",
  schema: {
    isDraft: fields.checkbox({
      label: KEYSTATIC_ARTICLES.isDraft,
      defaultValue: false,
    }),
    isMainHeadline: fields.checkbox({
      label: KEYSTATIC_ARTICLES.isMainHeadline,
      defaultValue: false,
    }),
    isSubHeadline: fields.checkbox({
      label: KEYSTATIC_ARTICLES.isSubHeadline,
      defaultValue: false,
    }),
    description: fields.text({
      label: KEYSTATIC_ARTICLES.description,
      validation: { isRequired: true, length: { max: 160 } },
    }),
    title: fields.slug({
      name: { label: KEYSTATIC_ARTICLES.title, validation: { length: { max: 60 } } },
    }),
    cover: fields.image({
      label: KEYSTATIC_ARTICLES.cover,
      directory: "src/assets/images/articles",
      publicPath: "@assets/images/articles/",
    }),
    category: fields.relationship({
      label: KEYSTATIC_ARTICLES.category,
      collection: "categories",
    }),
    tags: fields.array(
      fields.relationship({
        label: KEYSTATIC_ARTICLES.tags,
        collection: "tags",
      }),
      {
        label: KEYSTATIC_ARTICLES.tags,
        itemLabel: (props) => props.value ?? "",
      }
    ),
    publishedTime: fields.datetime({
      label: KEYSTATIC_ARTICLES.publishedTime,
      validation: { isRequired: true },
    }),
    authors: fields.array(
      fields.relationship({
        label: KEYSTATIC_ARTICLES.authors,
        collection: "authors",
      }),
      {
        label: KEYSTATIC_ARTICLES.authors,
        itemLabel: (props) => props.value ?? "",
        validation: {
          length: {
            min: 1,
          },
        },
      }
    ),
    // Đây là custom Nút tải xuống
    link: fields.text({
      label: KEYSTATIC_ARTICLES.link,
      description: KEYSTATIC_ARTICLES.linkDesc,
    }),
    // 
    content: fields.mdx({
      label: KEYSTATIC_ARTICLES.content,
      options: {
        image: {
          directory: "src/assets/images/articles",
          publicPath: "@assets/images/articles",
        },
      },
    }),
  },
});
