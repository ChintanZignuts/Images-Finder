import axios from 'axios'

const clientId = import.meta.env.VITE_API_ACCESS_KEY
console.log(clientId)
const Unsplash_Root = 'https://api.unsplash.com'

export async function getTrendingImg(page: number) {
  const response = await axios.get(
    `${Unsplash_Root}/photos?page=${page}&per_page=15&client_id=${clientId}`
  )
  return response.data
}

export async function getImgBySearch(query: string, page: number) {
  const response = await axios.get(
    `${Unsplash_Root}/search/photos?page=${page}&per_page=15&query=${query}&client_id=${clientId}`
  )
  return response.data
}
