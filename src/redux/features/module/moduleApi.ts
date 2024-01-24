import { baseApi } from "../../api/baseApi";

type TModule = {
  title: string;
  mark?: number;
  status?: boolean;
};

const moduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addModule: builder.mutation({
      query: (module: TModule) => ({
        url: "/module",
        method: "POST",
        body: module,
      }),
      invalidatesTags: ["all-module"],
    }),

    getAllModule: builder.query({
      query: () => ({
        url: "/module",
        method: "GET",
      }),
      providesTags: ["all-module"],
    }),

    getModuleById: builder.query({
      query: (id: string) => ({
        url: `/module/${id}`,
        method: "GET",
      }),
      providesTags: ["all-module"],
    }),

    updateModule: builder.mutation({
      query: (module: Partial<TModule> & { id: string }) => {
        const { id, ...rest } = module;
        return {
          url: `/module/${id}`,
          method: "PATCH",
          body: rest,
        };
      },
      invalidatesTags: ["all-module"],
    }),
    deleteModule: builder.mutation({
      query: (id: string) => ({
        url: `/module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["all-module"],
    }),
  }),
});

export const {
  useAddModuleMutation,
  useGetAllModuleQuery,
  useGetModuleByIdQuery,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = moduleApi;
