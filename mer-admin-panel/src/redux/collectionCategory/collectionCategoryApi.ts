import { IAddCollectionCategory, ICollectionCategory } from "@/types/collection";
import { apiSlice } from "../api/apiSlice";

export const collectionCategoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // add collection category
    addCollectionCategory: builder.mutation<{ message: string }, IAddCollectionCategory>({
      query(data: IAddCollectionCategory) {
        return {
          url: `/api/collection-category`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCollectionCategories"],
    }),
    // get all collection categories
    getAllCollectionCategories: builder.query<ICollectionCategory[], void>({
      query: () => `/api/collection-category`,
      transformResponse: (response: { data: ICollectionCategory[] }) => response.data,
      providesTags: ["AllCollectionCategories"],
      keepUnusedDataFor: 5,
    }),
    // get single collection category
    getCollectionCategory: builder.query<ICollectionCategory, string>({
      query: (id) => `/api/collection-category/${id}`,
      transformResponse: (response: { data: ICollectionCategory }) => response.data,
      providesTags: ['CollectionCategory']
    }),
    // edit collection category
    editCollectionCategory: builder.mutation<{message:string}, { id: string; data: Partial<IAddCollectionCategory> }>({
      query({ id, data }) {
        return {
          url: `/api/collection-category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllCollectionCategories", "CollectionCategory"],
    }),
    // delete collection category
    deleteCollectionCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query(id: string) {
        return {
          url: `/api/collection-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCollectionCategories"],
    }),
  }),
});

export const {
  useGetAllCollectionCategoriesQuery,
  useDeleteCollectionCategoryMutation,
  useAddCollectionCategoryMutation,
  useGetCollectionCategoryQuery,
  useEditCollectionCategoryMutation,
} = collectionCategoryApi;
