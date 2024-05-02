import { baseApi } from "./api";
import pb, { ANIME_COL } from '../services/pocketbase'
import { generateCacheTagList } from "../vendors/rtkQueryUtils";

export const animeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnimes: builder.query({
            providesTags: (result) => generateCacheTagList(result, 'animes'),
            queryFn: async () => {
                try {
                    const data = await pb.collection(ANIME_COL).getFullList({
                        batch: 10000
                    })
                    return { data }
                } catch (error) {
                    return { error: error.error }
                }
            }
        }),
        getAnime: builder.query({
            providesTags: (result) => ([{ type: 'animes', id: result.id }]),
            queryFn: async (id) => {
                try {
                    const data = await pb.collection(ANIME_COL).getOne(id, {
                        expand: 'tags'
                    })
                    return { data }
                } catch (error) {
                    return { error: error.error }
                }
            }
        }),
        getAnimesWithOption: builder.query({
            providesTags: (result) => generateCacheTagList(result, 'animes'),
            queryFn: async (options) => {
                try {
                    const data = await pb.collection(ANIME_COL).getFullList(options)
                    return { data }
                } catch (error) {
                    return { error: error.error }
                }
            }
        })
    })
})

export const {
    useGetAnimesQuery,
    useGetAnimeQuery,
    useGetAnimesWithOptionQuery,
} = animeApi