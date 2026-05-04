import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
return {
    background_color: "#FFFFFF",
    description: "Discover a diverse collection of original artworks for sale",
    display: "standalone",
    icons: [
        {
            purpose: "maskable",
            sizes: "192x192",
            src: "/icons/icon-192x192.png",
            type: "image/png"
        },
        {
            sizes: "384x384",
            src: "/icons/icon-384x384.png",
            type: "image/png"
        },
        {
            sizes: "512x512",
            src: "/icons/icon-512x512.png",
            type: "image/png"
        }
    ],
    name: "Diann x Art | Original artwork",
    orientation: "portrait",
    short_name: "DiannXArt",
    start_url: "/lt/work",
    theme_color: "#FFFFFF"
  }
}
