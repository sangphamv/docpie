import { getCollection } from "astro:content";
import { articlesHandler } from "./articles";

const tagsCollection = (await getCollection("tags")).sort((a, b) =>
  a.data.title.localeCompare(b.data.title)
);

export const tagsHandler = {
  allTags: () => tagsCollection,
  oneTag: (tagId: string) => {
    const tag = tagsCollection.find((tag) => tag.id === tagId);
    if (!tag) {
      throw new Error(`Tag with id ${tagId} not found`);
    }
    return tag;
  },
  oneTagByPath: (path: string) => {
    const tag = tagsCollection.find((tag) => tag.data.path === path);
    if (!tag) {
      throw new Error(`Tag with path ${path} not found`);
    }
    return tag;
  },
  allTagsWithCount: () => {
    const articles = articlesHandler.allArticles();
    return tagsCollection.map((tag) => {
      const count = articles.filter((article) =>
        (article.data.tags ?? []).some((tagRef) => tagRef.id === tag.id)
      ).length;
      return {
        ...tag,
        data: {
          ...tag.data,
          count,
        },
      };
    });
  },
  articlesByTagId: (tagId: string) => {
    return articlesHandler
      .allArticles()
      .filter((article) => (article.data.tags ?? []).some((tag) => tag.id === tagId));
  },
};
