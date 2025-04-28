import { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/utils/apiClient";

// Base URL from environment variable or default
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://naftalan.az";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Statik sayfalar - her dil için oluşturulacak
const staticPages = [
  "", // Ana sayfa
  "/about", // Hakkımızda
  "/about/history", // Tarih
  "/about/treatments", // Tedaviler
  "/sanatoriums/naftalan", // Naftalan sanatoriumları
  "/sanatoriums/other", // Diğer sanatoriumlar
  "/how-to-come", // Nasıl gelinir
  "/reservation", // Rezervasyon
  "/blog", // Blog listesi
  "/contact", // İletişim
  "/ask-doctor", // Doktora sor
];

// Google Resimleri için genişletilmiş sitemap girişi
interface ImageSitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    url: string;
    title?: string;
    caption?: string;
    geo_location?: string;
    license_url?: string;
  }>;
}

/**
 * Pagination ile tüm verileri almak için yardımcı fonksiyon
 */
async function fetchAllPaginatedData<T>(
  baseUrl: string,
  locale: string,
  resourceType: 'blogs' | 'sanatoriums'
): Promise<T[]> {
  let allItems: T[] = [];
  let currentPage = 1;
  let hasMorePages = true;

  // Büyük bir sayfa boyutu kullanarak tek seferde mümkün olduğunca çok veri alalım
  const pageSize = 100;
  
  while (hasMorePages) {
    try {
      const response = await fetch(
        `${baseUrl}/api/${resourceType}/?page=${currentPage}&page_size=${pageSize}`, 
        {
          headers: {
            'Accept-Language': locale
          },
          next: {
            revalidate: 3600 // 1 saat
          }
        }
      );
      
      const data = await response.json();
      const results = data.results || [];
      
      if (results.length === 0) {
        hasMorePages = false;
      } else {
        allItems = [...allItems, ...results];
        
        // Eğer sonraki sayfa yoksa veya son sayfaya ulaştıysak döngüyü bitir
        if (!data.next || results.length < pageSize) {
          hasMorePages = false;
        } else {
          currentPage++;
        }
      }
    } catch (error) {
      console.error(`Error fetching page ${currentPage} of ${resourceType}:`, error);
      hasMorePages = false; // Hata durumunda döngüyü durdur
    }
  }
  
  return allItems;
}

/**
 * Sitemap verilerinin geçerli olduğundan emin olmak için doğrulama fonksiyonu
 * Özellikle [object Object] gibi hataları önlemek için
 */
function validateSitemapData(entries: ImageSitemapEntry[]): ImageSitemapEntry[] {
  return entries.map(entry => {
    // URL'nin string olduğunu kontrol et
    if (typeof entry.url !== 'string') {
      console.error('Invalid sitemap entry URL:', entry.url);
      return null;
    }
    
    // Resimler varsa her birini doğrula
    const validatedImages = entry.images?.map(img => {
      // Resim URL'si string değilse onu atla
      if (typeof img.url !== 'string') {
        console.error('Invalid image URL in sitemap:', img.url);
        return null;
      }
      
      return {
        url: img.url,
        title: typeof img.title === 'string' ? img.title : undefined,
        caption: typeof img.caption === 'string' ? img.caption : undefined,
        geo_location: typeof img.geo_location === 'string' ? img.geo_location : undefined,
        license_url: typeof img.license_url === 'string' ? img.license_url : undefined
      };
    }).filter(Boolean);
    
    return {
      url: entry.url,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      images: validatedImages && validatedImages.length > 0 ? validatedImages : undefined
    };
  }).filter(Boolean) as ImageSitemapEntry[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Tüm sitemap girdileri
    const entries: ImageSitemapEntry[] = [];
    
    // Statik sayfaları her dil için ekle
    for (const locale of SUPPORTED_LOCALES) {
      staticPages.forEach(page => {
        entries.push({
          url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date().toISOString(),
          changeFrequency: page === "" ? "daily" : "weekly",
          priority: page === "" ? 1.0 : 0.8,
        });
      });
    }

    // Blog yazıları için dinamik URL'ler ve resimleri
    try {
      // Her dil için tüm blog yazılarını al
      for (const locale of SUPPORTED_LOCALES) {
        const blogs = await fetchAllPaginatedData(API_BASE_URL, locale, 'blogs');
        
        blogs.forEach((blog: any) => {
          // Ana resim URL'sini mutlak URL'ye dönüştür
          const imageUrl = blog.image && (
            blog.image.startsWith('http') 
              ? blog.image 
              : `${SITE_URL}${blog.image}`
          );
          
          // OG resmi yoksa ana resmi kullan
          const ogImageUrl = blog.seo?.og_image 
            ? (blog.seo.og_image.startsWith('http') 
                ? blog.seo.og_image 
                : `${SITE_URL}${blog.seo.og_image}`)
            : imageUrl;

          // Resim nesnelerini oluştur
          const imageObjects = [];
          
          if (imageUrl) {
            imageObjects.push({
              url: imageUrl,
              title: blog.title,
              caption: blog.short_description?.substring(0, 100)
            });
          }
          
          // OG resmi ana resimden farklıysa ekleyelim
          if (ogImageUrl && ogImageUrl !== imageUrl) {
            imageObjects.push({
              url: ogImageUrl,
              title: blog.seo?.og_title || blog.title
            });
          }
          
          entries.push({
            url: `${SITE_URL}/${locale}/blog/${blog.slug}`,
            lastModified: blog.updated || new Date().toISOString(),
            changeFrequency: "monthly",
            priority: blog.is_featured ? 0.7 : 0.6,
            // Sadece resimler varsa ekle
            images: imageObjects.length > 0 ? imageObjects : undefined
          });
        });
      }
    } catch (error) {
      console.error("Error fetching blog data for sitemap:", error);
    }

    // Sanatorium sayfaları için dinamik URL'ler ve resimleri
    try {
      // Her dil için tüm sanatoriumları al
      for (const locale of SUPPORTED_LOCALES) {
        const sanatoriums = await fetchAllPaginatedData(API_BASE_URL, locale, 'sanatoriums');
        
        sanatoriums.forEach((sanatorium: any) => {
          // Ana resim varsa (main_image veya images dizisinden ilk resim)
          let mainImageUrl;
          if (sanatorium.main_image?.image) {
            mainImageUrl = sanatorium.main_image.image.startsWith('http')
              ? sanatorium.main_image.image
              : `${SITE_URL}${sanatorium.main_image.image}`;
          } else if (sanatorium.images && sanatorium.images.length > 0) {
            mainImageUrl = sanatorium.images[0].image.startsWith('http')
              ? sanatorium.images[0].image
              : `${SITE_URL}${sanatorium.images[0].image}`;
          }
          
          // OG resmi
          const ogImageUrl = sanatorium.seo?.og_image 
            ? (sanatorium.seo.og_image.startsWith('http') 
                ? sanatorium.seo.og_image 
                : `${SITE_URL}${sanatorium.seo.og_image}`)
            : undefined;
          
          // Resim URL'lerini topla
          const imageUrls: string[] = [];
          
          // Ana görsel varsa ekle
          if (mainImageUrl) {
            imageUrls.push(mainImageUrl);
          }
          
          // OG resmi varsa ekle
          if (ogImageUrl && ogImageUrl !== mainImageUrl) {
            imageUrls.push(ogImageUrl);
          }
          
          // Diğer görselleri ekle (maksimum 5 tane)
          if (sanatorium.images && sanatorium.images.length > 0) {
            for (let i = 0; i < Math.min(sanatorium.images.length, 5); i++) {
              const img = sanatorium.images[i];
              if (!img || !img.image) continue;
              
              const imgUrl = img.image.startsWith('http') 
                ? img.image 
                : `${SITE_URL}${img.image}`;
                
              // Eğer bu URL daha önce eklenmemişse ekle
              if (!imageUrls.includes(imgUrl)) {
                imageUrls.push(imgUrl);
              }
            }
          }
          
          // Resim nesnelerini oluştur
          const imageObjects = imageUrls.map(url => ({
            url: url, // önemli: sadece 'url' değil 'url: url' olarak belirtmek
            title: sanatorium.name,
            // Coğrafi konum bilgisi
            geo_location: sanatorium.location?.region
              ? `${sanatorium.location.region}, ${sanatorium.location.country || 'Azerbaijan'}`
              : 'Azerbaijan'
          }));
          
          entries.push({
            url: `${SITE_URL}/${locale}/sanatoriums/${sanatorium.slug}`,
            lastModified: sanatorium.updated || new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.9, // Sanatoriumlar sitenin ana içeriği
            images: imageObjects.length > 0 ? imageObjects : undefined
          });
        });
      }
    } catch (error) {
      console.error("Error fetching sanatorium data for sitemap:", error);
    }

    // En sonda, entries'i döndürmeden önce doğrula
    const validatedEntries = validateSitemapData(entries);
    
    // ImageSitemapEntry dizisini MetadataRoute.Sitemap olarak dönüştür
    return validatedEntries as unknown as MetadataRoute.Sitemap;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    // Hata durumunda en azından statik sayfaları döndür
    return staticPages.flatMap(page => 
      SUPPORTED_LOCALES.map(locale => ({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date().toISOString(),
      }))
    );
  }
}