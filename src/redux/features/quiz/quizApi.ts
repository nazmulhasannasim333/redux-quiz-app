import { TQuiz } from "../../../types/quiz.types";
import { baseApi } from "../../api/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuiz: builder.mutation({
      query: (quiz: TQuiz[]) => ({
        url: "/quiz",
        method: "POST",
        body: quiz,
      }),
      invalidatesTags: ["all-quiz"],
    }),

    getAllQuiz: builder.query({
      query: (moduleId: string) => ({
        url: `/quiz?module=${moduleId}`,
        method: "GET",
      }),
      providesTags: ["all-quiz"],
    }),

    getQuizById: builder.query({
      query: (id: string) => ({
        url: `/quiz/${id}`,
        method: "GET",
      }),
    }),

    updateQuiz: builder.mutation({
      query: (quiz: TQuiz & { id: string }) => ({
        url: `/quiz/${quiz.id}`,
        method: "PUT",
        body: {
          question: quiz.question,
          description: quiz.description,
          options: quiz.options,
          correctOption: quiz.correctOption,
          module: quiz.module,
        },
      }),
      invalidatesTags: ["all-quiz"],
    }),

    deleteQuiz: builder.mutation({
      query: (id: string) => ({
        url: `/quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["all-quiz"],
    }),
  }),
});

export const {
  useAddQuizMutation,
  useGetAllQuizQuery,
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
