import { baseApi } from "./api";
import pb, { TAG_COL } from '../services/pocketbase'
import { generateCacheTagList } from "../vendors/rtkQueryUtils";

export const tagApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query({
            providesTags: (result) => generateCacheTagList(result, 'tags'),
            queryFn: async () => {
                try {
                    const data = await pb.collection(TAG_COL).getFullList({
                        batch: 10000
                    })
                    return { data }
                } catch (error) {
                    return { error: error.error }
                }
            }
        }),
        getTag: builder.query({
            providesTags: (result) => ([{ type: 'tags', id: result.id }]),
            queryFn: async (id) => {
                try {
                    const data = await pb.collection(TAG_COL).getOne(id)
                    return { data }
                } catch (error) {
                    return { error: error.error }
                }
            }
        }),
        getTagOrder: builder.query({
            queryFn: async () => {
                try {
                    const data = await pb.collection(TAG_COL).getFullList({
                        batch: 10000,
                        sort: '+weight,+name',
                        fields: 'id'
                    })
                    return { data: data.map(x => x.id) }
                } catch (error) {
                    return { error: error.error }
                }
            }
        })
    })
})

export const {
    useGetTagsQuery,
    useGetTagQuery,
    useGetTagOrderQuery,
} = tagApi