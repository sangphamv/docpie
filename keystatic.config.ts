import { articlesKs, authorsKs, categoriesKs } from "@/lib/keystatic";
import { config } from "@keystatic/core";

export default config({
  storage: {
    // kind: "local",
    kind: "github",
    repo: "sangphamv/docpie", // 🔹 repo của bạn
    branch: "main", // 🔹 hoặc 'master' nếu repo dùng branch này
  },
  ui: {
    brand: {
      name: "Docpie",
    },
    navigation: ["---", "articles", "---", "authors", "categories"],
  },
  collections: {
    articles: articlesKs,
    authors: authorsKs,
    categories: categoriesKs,
  },
});
