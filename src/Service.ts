import axios from 'axios'

const clientId = import.meta.env.VITE_API_ACCESS_KEY
console.log(clientId)
const Unsplash_Root = 'https://api.unsplash.com'

export async function getTrendingImg() {
  const response = await axios.get(`${Unsplash_Root}/photos?client_id=${clientId}`)
  return response.data
}

export async function getImgBySearch(query: string) {
  const response = await axios.get(
    `${Unsplash_Root}/search/photos?page=1&query=${query}&client_id=${clientId}`
  )
  return response.data
}
