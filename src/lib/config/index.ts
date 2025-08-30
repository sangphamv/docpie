import type { Link } from "../types";

export const SITE = {
  // vi-VN
  title: "Docpie",
  description: "Trang web chia sẻ tài liệu miễn phí",
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
    text: "Tài Liệu",
  },
  {
    href: "/categories/courses",
    text: "Khóa Học",
  },
  {
    href: "/categories/software",
    text: "Phần Mềm",
  },
  {
    href: "/categories/seo",
    text: "SEO",
  },
  {
    href: "/categories/wordpress",
    text: "Wordpress",
  },
  {
    href: "/categories/technology",
    text: "Công Nghệ",
  },
  {
    href: "/categories/programming",
    text: "Lập Trình",
  },
  {
    href: "/categories/lifestyle",
    text: "Lối Sống",
  },
  {
    href: "/categories/productivity",
    text: "Năng Suất",
  },
  {
    href: "/categories/health",
    text: "Sức Khỏe",
  },
  {
    href: "/categories/finance",
    text: "Tài Chính",
  },
  {
    href: "/categories/wellness",
    text: "Sống Khỏe",
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
  Homepage: "Trang Chủ",
  Articles: "Bài Viết Mới",
  Categories: "Danh Mục",
  Other_Pages: "Các Trang Khác",
  Social_Media: "Mạng Xã Hội:",
  View_All: "Xem Tất Cả",
  Latest_News: "Tin Tức Mới Nhất",
  Authors: "Tác Giả",
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
  previous: "Trang Trước",
  next: "Trang Sau",
};
