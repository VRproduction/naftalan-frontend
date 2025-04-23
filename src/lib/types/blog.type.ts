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
      meta_title: string,
      meta_description: string,
      meta_keywords: string,
      og_title: string,
      og_description: string,
      og_image: string,
      canonical_url: string,
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