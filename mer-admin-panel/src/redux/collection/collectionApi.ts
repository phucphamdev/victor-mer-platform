import { IAddCollection, ICollection } from "@/types/collection";
import { apiSlice } from "../api/apiSlice";

export const collectionApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // add collection
    addCollection: builder.mutation<{ message: string }, IAddCollection>({
      query(data: IAddCollection) {
        return {
          url: `/api/collection`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCollections"],
    }),
    // get all collections
    getAllCollections: builder.query<ICollection[], void>({
      query: () => `/api/collection`,
      transformResponse: (response: { data: ICollection[] }) => response.data,
      providesTags: ["AllCollections"],
      keepUnusedDataFor: 5,
    }),
    // get single collection
    getCollection: builder.query<ICollection, string>({
      query: (id) => `/api/collection/${id}`,
      transformResponse: (response: { data: ICollection }) => response.data,
      providesTags: ['Collection']
    }),
    // edit collection
    editCollection: builder.mutation<{message:string}, { id: string; data: Partial<IAddCollection> }>({
      query({ id, data }) {
        return {
          url: `/api/collection/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllCollections", "Collection"],
    }),
    // delete collection
    deleteCollection: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query(id: string) {
        return {
          url: `/api/collection/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCollections"],
    }),
  }),
});

export const {
  useGetAllCollectionsQuery,
  useDeleteCollectionMutation,
  useAddCollectionMutation,
  useGetCollectionQuery,
  useEditCollectionMutation,
} = collectionApi;
