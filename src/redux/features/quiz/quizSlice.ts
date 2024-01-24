import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TQuiz, TQuizInitialState } from "../../../types/quiz.types";

const initialState: TQuizInitialState = {
  quizQuestion: {
    question: "",
    description: "",
  },
  quizOptions: {
    options: {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
    correctOption: "",
  },
  quizList: [],
  currentQuestionIndex: 0,
  userResponses: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizQuestion: (
      state,
      action: PayloadAction<TQuizInitialState["quizQuestion"]>
    ) => {
      state.quizQuestion = action.payload;
    },
    setQuizOptions: (
      state,
      action: PayloadAction<TQuizInitialState["quizOptions"]>
    ) => {
      state.quizOptions = action.payload;
    },
    addQuizToList: (state, action: PayloadAction<TQuiz["module"]>) => {
      state.quizList.push({
        question: state.quizQuestion.question,
        description: state.quizQuestion.description,
        options: Object.values(state.quizOptions.options),
        correctOption: state.quizOptions.correctOption,
        module: action.payload,
      });
    },
    clearQuizData: (state) => {
      state.quizQuestion = initialState.quizQuestion;
      state.quizOptions = initialState.quizOptions;
    },
    clearQuizList: (state) => {
      state.quizList = initialState.quizList;
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    setUserResponse: (state, action) => {
      const { question, selectedAnswer } = action.payload;
      state.userResponses[state.currentQuestionIndex] = {
        question,
        selectedAnswer,
      };
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = initialState.currentQuestionIndex;
      state.userResponses = initialState.userResponses;
    },
  },
});

export const {
  setQuizQuestion,
  setQuizOptions,
  addQuizToList,
  clearQuizData,
  clearQuizList,
  setCurrentQuestionIndex,
  setUserResponse,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
