import type { Link } from "../types";

export const SITE = {
  // vi-VN
  title: "Docpie",
  description: "Docpie là trang web chia sẻ tài liệu miễn phí",
  author: "sangphamv",
  url: "https://docpie.click",
  github: "https://github.com/sangphamv",
  locale: "vi-VN",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
};

export const CATEGORY_TITLES: Record<string, string> = {
  document: "Tài liệu",
  courses: "Khóa học",
  software: "Phần mềm",
  seo: "SEO",
  wordpress: "Wordpress",
  technology: "Công nghệ",
  programming: "Lập trình",
  lifestyle: "Lối sống",
  productivity: "Năng suất",
  health: "Sức khỏe",
  finance: "Tài chính",
  wellness: "Sống khỏe",
};

export const NAVIGATION_LINKS: Link[] = [
  // vi-VN
  {
    href: "/categories/document",
    text: "Tài liệu",
  },
  {
    href: "/categories/courses",
    text: "Khóa học",
  },
  {
    href: "/categories/software",
    text: "Phần mềm",
  },
  {
    href: "/categories/seo",
    text: "SEO",
  },
  {
    href: "/categories/wordpress",
    text: "WordPress",
  },
  {
    href: "/categories/technology",
    text: "Công nghệ",
  },
  {
    href: "/categories/programming",
    text: "Lập trình",
  },
  {
    href: "/categories/lifestyle",
    text: "Lối sống",
  },
  {
    href: "/categories/productivity",
    text: "Năng suất",
  },
  {
    href: "/categories/health",
    text: "Sức khỏe",
  },
  {
    href: "/categories/finance",
    text: "Tài chính",
  },
  {
    href: "/categories/wellness",
    text: "Sống khỏe",
  },
];

export const OTHER_LINKS: Link[] = [
  {
    href: "/about",
    text: "Về Website",
  },
  {
    href: "/authors",
    text: "Tác giả",
  },
  {
    href: "/contact",
    text: "Liên hệ",
  },
  {
    href: "/privacy",
    text: "Chính sách bảo mật",
  },
  {
    href: "/terms",
    text: "Điều khoản",
  },
  {
    href: "/cookie-policy",
    text: "Chính sách cookie",
  },
  {
    href: "https://docpie.click/rss.xml",
    text: "RSS",
  },
  {
    href: "https://docpie.click/sitemap-index.xml",
    text: "Sitemap",
  },
];

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://github.com",
    text: "GitHub",
    icon: "github",
  },
  {
    href: "httpe://www.t.me",
    text: "Telegram",
    icon: "telegram",
  },
  {
    href: "https://twitter.com",
    text: "Twitter",
    icon: "newTwitter",
  },
  {
    href: "https://www.facebook.com",
    text: "Facebook",
    icon: "facebook",
  },
];

export const CONSTANTS = {
  Homepage: "Trang chủ",
  Articles: "Bài viết mới",
  Categories: "Danh mục",
  Other_Pages: "Các trang khác",
  Social_Media: "Mạng xã hội:",
  View_All: "Xem tất cả",
  Latest_News: "Bài viết mới",
  Authors: "Tác giả",
  AuthorOf: "Bài viết của",
  Featured_Stories: "Bài viết nổi bậc",
  Latest_Stories_Published: "Bài viết mới",
  Event_Announcements: "Thông báo sự kiện",
  Table_Of_Contents: "Mục lục",
  Loading: "Đang tải...",
  No_Headings: "Không có tiêu đề nào trong bài viết này",
  Parallax_Showcase_Title: "Bài viết mới nhất",
  Parallax_Showcase_CTA: "Xem tất cả",
};

export const KEYSTATIC_ARTICLES = {
  label: "Bài viết",
  isDraft: "Là bản nháp?",
  isMainHeadline: "Là tiêu đề chính?",
  isSubHeadline: "Là tiêu đề phụ?",
  description: "Mô tả",
  title: "Tiêu đề",
  cover: "Bìa",
  category: "Danh mục",
  tags: "Thẻ",
  publishedTime: "Thời gian xuất bản",
  authors: "Tác giả",
  link: "Nút tải xuống",
  linkDesc: "Mô tả nút tải xuống",
  content: "Nội dung",
};

export const KEYSTATIC_CATEGORIES = {
  label: "Danh mục",
  title: "Tiêu đề",
  description: "Mô tả",
  path: "Đường dẫn",
  path_description: "Mô tả đường dẫn",
};

export const KEYSTATIC_TAGS = {
  label: "Thẻ",
  title: "Tiêu đề",
  description: "Mô tả",
  path: "Đường dẫn",
  path_description: "Mô tả đường dẫn",
};

export const KEYSTATIC_AUTHORS = {
  label: "Tác giả",
  name: "Tên",
  job: "Công việc",
  avatar: "Hình ảnh",
  bio: "Mô tả",
  social_name: "Tên",
  social_url: "URL",
  social_icon: "Biểu tượng",
  social: "Liên kết mạng xã hội",
  content: "Nội dung",
};

export const PAGINATION = {
  previous: "Trang trước",
  next: "Trang sau",
};

export const GISCUS = {
  repo: import.meta.env.PUBLIC_GISCUS_REPO ?? "sangphamv/docpie",
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID ?? "R_kgDOOVx57Q",
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY ?? "General",
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID ?? "DIC_kwDOOVx57c4Cz-B3",
  mapping: import.meta.env.PUBLIC_GISCUS_MAPPING ?? "pathname",
  reactionsEnabled: import.meta.env.PUBLIC_GISCUS_REACTIONS_ENABLED ?? "1",
  emitMetadata: import.meta.env.PUBLIC_GISCUS_EMIT_METADATA ?? "0",
  strict: import.meta.env.PUBLIC_GISCUS_STRICT ?? "0",
  inputPosition: import.meta.env.PUBLIC_GISCUS_INPUT_POSITION ?? "bottom",
  theme: import.meta.env.PUBLIC_GISCUS_THEME ?? "preferred_color_scheme",
  lang: import.meta.env.PUBLIC_GISCUS_LANG ?? "vi",
};
