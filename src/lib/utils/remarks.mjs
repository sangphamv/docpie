import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import getReadingTime from "reading-time";
import { toString as ConvertToString } from "mdast-util-to-string";

export function modifiedTime() {
  return (_, file) => {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    if (result.toString().length > 0 || result.toString() === "") {
      const result = statSync(filepath);
      file.data.astro.frontmatter.lastModified = result.mtime.toISOString();
    } else {
      file.data.astro.frontmatter.lastModified = result.toString();
    }
  };
}
// export function readingTime() {
//   return (tree, { data }) => {
//     const textOnPage = ConvertToString(tree);
//     const readingTime = getReadingTime(textOnPage, { wordsPerMinute: 180 });
//     // readingTime.text will give us minutes read as a friendly string,
//     // i.e. "3 min read"
//     data.astro.frontmatter.minutesRead = readingTime.text;
//   };
// }

export function readingTime() {
  return (tree, { data }) => {
    const textOnPage = ConvertToString(tree);
    const readingTime = getReadingTime(textOnPage, { wordsPerMinute: 180 });

    // Chuyển chuỗi "3 min read" => "3 phút đọc"
    const timeInVietnamese = readingTime.text.replace('min read', 'phút đọc');

    data.astro.frontmatter.minutesRead = timeInVietnamese;
  };
}

