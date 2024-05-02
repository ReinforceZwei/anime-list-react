import PocketBase from 'pocketbase'

const PB_URL = import.meta.env.VITE_PB_URL
console.log('PB_URL', PB_URL)
const pocketbase = new PocketBase(PB_URL)
pocketbase.autoCancellation(false)

export const USER_COL = 'users'
export const ANIME_COL = 'animes'

export default pocketbase