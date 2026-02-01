import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://medikost.id',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Tambahkan URL lain jika ada halaman lain
  ]
}