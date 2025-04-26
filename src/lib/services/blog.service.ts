import { BlogCategory, BlogPost, BlogTag } from "../types/blog.type";
import { PaginatedResponse } from "../types/response.type";
import api, { SupportedLocale } from "../utils/apiClient";

/**
 * Get a paginated list of blog posts
 */
export const getBlogPosts = async (
  locale: SupportedLocale,
  params?: {
    category?: string;
    tags?: string;
    page?: string;
    page_size?: string;
    search?: string;
  }
) => {
  const response = await api.get<PaginatedResponse<BlogPost>>(
    "/blogs/",
    {
      locale: locale,
      params: {
        category: params?.category || "",
        tags: params?.tags || "",
        page: params?.page || "1",
        page_size: params?.page_size || "10",
        search: params?.search || "",
      },
    }
  );
  return response;
};


export const getBlogCategories = async (locale: SupportedLocale) => {
  const response = await api.get<BlogCategory[]>(`/blogs/categories/`, { locale: locale });
  return response;
};

export const getBlogTags = async (locale: SupportedLocale) => {
  const response = await api.get<BlogTag[]>(`/blogs/tags/`, { locale: locale });
  return response;
};

/**
 * Get a single blog post by slug
 */
export const getBlogPost = async (locale: SupportedLocale, slug: string) => {
  const response = await api.get<BlogPost>(`/blogs/${slug}/`, { locale: locale });
  return response;
};

/**
 * Get recent blog posts
 */
export const getRecentBlogPosts = async (locale: SupportedLocale, limit = 3) => {
  const response = await api.get<BlogPost[]>(
    "/blog/posts/recent/",
    {
      locale: locale,
      params: {
        limit: limit.toString(),
      },
    }
  );
  return response;
};

/**
 * Get related blog posts based on post ID or slug
 */
export const getRelatedBlogPosts = async (locale: SupportedLocale, postId: string | number, limit = 3) => {
  const response = await api.get<BlogPost[]>(
    `/blog/posts/related/${postId}/`,
    {
      locale: locale,
      params: {
        limit: limit.toString(),
      },
    }
  );
  return response;
}; 