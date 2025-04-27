export interface BlogPost {
    id: number,
    title: string,
    category: string,
    slug: string,
    short_description: string,
    description: string,
    date: string,
    image: string,
    view_count: number,
    created: string,
    updated: string,
    is_popular: boolean,
    is_featured: boolean,
    seo: {
      meta_title: string | null,
      meta_description: string | null,
      meta_keywords: string | null,
      og_title: string | null,
      og_description: string | null,
      og_image: string | null,
      canonical_url: string | null,
      no_index: boolean,
      no_follow: boolean
    },
    other_blogs: BlogPost[],
    tags: [
      {
        id: number,
        title: string
      }
    ]
  }
    

export interface BlogCategory{
    id: number,
    title: string
}

export interface BlogTag{
    id: number,
    title: string
}