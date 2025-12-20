# Tính năng SEO hiện có

- Chuỗi metadata: sinh `title`, `description`, canonical, charset, Open Graph, Twitter Card tự động qua astro-seo ([head](../src/components/bases/head.astro), [getMeta](../src/lib/utils/getMeta.ts)).
- Metadata bài viết: `ArticleMeta` ghép ngày xuất bản/cập nhật, tác giả, thẻ, danh mục, ảnh bìa để social card và rich snippet đầy đủ.
- Dữ liệu cấu trúc: WebSite + Organization JSON-LD toàn cục; trang bài viết thêm NewsArticle, BreadcrumbList, Person (tác giả) và breadcrumb danh mục ([articles/[id].astro](../src/pages/articles/%5Bid%5D.astro)).
- Canonical + hreflang: tạo canonical từng trang và hreflang ngôn ngữ hiện tại để giảm trùng lặp nội dung.
- Sơ đồ & nguồn tin: liên kết sitemap-index và RSS trong head để bot phát hiện nhanh.
- Tín hiệu PWA: manifest, favicon, service worker đăng ký toàn site hỗ trợ điểm Lighthouse/SEO.
- Hỗ trợ hiệu năng: preconnect/dns-prefetch font, skeleton ảnh ở layout cơ sở để cải thiện LCP/CLS.

# Kiểm tra nhanh

- Mỗi bài cần đủ `description`, `cover`, `publishedTime`, `authors`, `category`, `tags` để tránh thiếu dữ liệu cấu trúc.
- Thêm locale mới thì mở rộng `HreflangLinks` để xuất đủ hreflang.
- Khi thêm route/bộ sưu tập mới, nhớ cập nhật/generate sitemap và RSS.
