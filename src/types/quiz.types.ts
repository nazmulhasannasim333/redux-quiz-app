export type TQuizQuestion = {
  question: string;
  description: string;
};

export type TQuizOptions = {
  options: {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
  };
  correctOption: string;
};

export type TQuiz = {
  question: string;
  description: string;
  options: string[];
  correctOption: string;
  module: string;
};

export type TUserResponse = {
  question: string;
  selectedAnswer: string;
};

export type TModuleQuizes = {
  _id: string;
  moduleName: string;
  quizMarks: number;
  status: boolean;
  quizList: {
    question: string;
    description: string;
    options: {
      option1: string;
      option2: string;
      option3: string;
      option4: string;
    };
    correctOption: string;
  }[];
};

export type TQuizInitialState = {
  quizQuestion: {
    question: string;
    description: string;
  };
  quizOptions: {
    options: {
      option1: string;
      option2: string;
      option3: string;
      option4: string;
    };
    correctOption: string;
  };
  quizList: TQuiz[];
  currentQuestionIndex: number;
  userResponses: TUserResponse[];
};
