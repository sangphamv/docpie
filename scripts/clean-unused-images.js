import { readdirSync, statSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Đường dẫn đến thư mục chứa ảnh và bài viết
const ARTICLES_CONTENT_DIR = join(__dirname, '../src/content/articles');
const ARTICLES_IMAGES_DIR = join(__dirname, '../src/assets/images/articles');

/**
 * Hàm lấy danh sách slug của các bài viết hiện có
 */
function getExistingArticleSlugs() {
  try {
    const files = readdirSync(ARTICLES_CONTENT_DIR);
    // Lọc chỉ lấy file .mdx và bỏ phần mở rộng để lấy slug
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''));
  } catch (error) {
    console.error('❌ Lỗi khi đọc thư mục bài viết:', error.message);
    return [];
  }
}

/**
 * Hàm lấy danh sách thư mục ảnh hiện có
 */
function getImageDirectories() {
  try {
    const items = readdirSync(ARTICLES_IMAGES_DIR);
    // Lọc chỉ lấy thư mục (không lấy file)
    return items.filter(item => {
      const itemPath = join(ARTICLES_IMAGES_DIR, item);
      return statSync(itemPath).isDirectory();
    });
  } catch (error) {
    console.error('❌ Lỗi khi đọc thư mục ảnh:', error.message);
    return [];
  }
}

/**
 * Hàm xóa thư mục và toàn bộ nội dung bên trong
 */
function deleteDirectory(dirPath) {
  try {
    rmSync(dirPath, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.error(`❌ Lỗi khi xóa thư mục ${dirPath}:`, error.message);
    return false;
  }
}

/**
 * Hàm chính để dọn dẹp ảnh không sử dụng
 */
function cleanUnusedImages() {
  console.log('🧹 Bắt đầu dọn dẹp thư mục ảnh không sử dụng...\n');

  // Lấy danh sách slug của các bài viết hiện có
  const articleSlugs = getExistingArticleSlugs();
  console.log(`📝 Tìm thấy ${articleSlugs.length} bài viết:`);
  articleSlugs.forEach(slug => console.log(`   - ${slug}`));
  console.log('');

  // Lấy danh sách thư mục ảnh
  const imageDirectories = getImageDirectories();
  console.log(`🖼️  Tìm thấy ${imageDirectories.length} thư mục ảnh:`);
  imageDirectories.forEach(dir => console.log(`   - ${dir}`));
  console.log('');

  // Tìm các thư mục ảnh không có bài viết tương ứng
  const unusedDirectories = imageDirectories.filter(dir => !articleSlugs.includes(dir));

  if (unusedDirectories.length === 0) {
    console.log('✅ Không có thư mục ảnh nào cần dọn dẹp!');
    return;
  }

  console.log(`🗑️  Tìm thấy ${unusedDirectories.length} thư mục ảnh không sử dụng:\n`);

  let deletedCount = 0;
  let failedCount = 0;

  // Xóa từng thư mục không sử dụng
  unusedDirectories.forEach(dir => {
    const dirPath = join(ARTICLES_IMAGES_DIR, dir);
    console.log(`🗑️  Đang xóa: ${dir}`);
    
    if (deleteDirectory(dirPath)) {
      deletedCount++;
      console.log(`   ✅ Đã xóa thành công`);
    } else {
      failedCount++;
      console.log(`   ❌ Xóa thất bại`);
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Tổng kết:`);
  console.log(`   - Đã xóa: ${deletedCount} thư mục`);
  if (failedCount > 0) {
    console.log(`   - Thất bại: ${failedCount} thư mục`);
  }
  console.log('='.repeat(50));
  console.log('✅ Hoàn tất dọn dẹp!');
}

// Chạy script
cleanUnusedImages();
