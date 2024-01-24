import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";

import toast from "react-hot-toast";
import { useGetAllQuizQuery } from "../redux/features/quiz/quizApi";
import {
  resetQuiz,
  setCurrentQuestionIndex,
  setUserResponse,
} from "../redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TQuiz, TUserResponse } from "../types/quiz.types";
import {
  useGetModuleByIdQuery,
  useUpdateModuleMutation,
} from "../redux/features/module/moduleApi";

export function QuizModal({ moduleId }: { moduleId: string }) {
  const dispatch = useAppDispatch();
  const { data: singleModule, isLoading: singleModuleLoading } =
    useGetModuleByIdQuery(moduleId);
  const [updateQuiz] = useUpdateModuleMutation();
  const [open, setOpen] = React.useState(false);

  const { currentQuestionIndex, userResponses } = useAppSelector(
    (state) => state.quiz
  );

  const { data: quizes, isLoading } = useGetAllQuizQuery(moduleId);

  const handleOpen = () => setOpen(!open);

  const handleOptionSelect = (question: string, selectedAnswer: string) => {
    dispatch(setUserResponse({ question, selectedAnswer }));
  };

  const handleNextQuestion = () => {
    dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
  };

  const handlePreviousQuestion = () => {
    dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));
  };

  const calculateMarks = (userResponses: TUserResponse[], quizes: TQuiz[]) => {
    let totalMarks = 0;

    quizes.forEach((quiz, index) => {
      if (quiz.correctOption === userResponses[index].selectedAnswer) {
        totalMarks += 1;
      }
    });

    return totalMarks;
  };

  const handleQuizSubmission = async () => {
    const totalMarks = calculateMarks(userResponses, quizes.data);
    await updateQuiz({
      mark: totalMarks,
      status: true,
      id: moduleId,
    });
    dispatch(setCurrentQuestionIndex(0));
    dispatch(resetQuiz());
    handleOpen();
    toast.success("Quiz Submitted Successfully");
  };

  const handleResetQuiz = async () => {
    await updateQuiz({
      mark: 0,
      status: false,
      id: moduleId,
    });
    toast.success("Quiz Reset Successfully");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  return (
    <>
      <div>
        {!singleModuleLoading && singleModule?.data.status && (
          <Typography placeholder={""} variant="h6" color="purple">
            Obtained Marks: {singleModule.data.mark}
          </Typography>
        )}
      </div>
      <div>
        {!singleModuleLoading && singleModule?.data.status === false ? (
          <Button
            size="sm"
            placeholder={""}
            onClick={handleOpen}
            variant="gradient"
          >
            Start Quiz
          </Button>
        ) : (
          <Button
            size="sm"
            placeholder={""}
            onClick={handleResetQuiz}
            variant="gradient"
            color="green"
          >
            Reset Quiz
          </Button>
        )}
      </div>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <DialogHeader placeholder={""} className="pb-0 flex justify-end">
          <XMarkIcon
            onClick={() => {
              handleOpen();
              dispatch(setCurrentQuestionIndex(0));
              dispatch(resetQuiz());
            }}
            className="text-red-500 w-7 cursor-pointer hover:bg-red-100 rounded-2xl"
          />
        </DialogHeader>
        <DialogBody placeholder={""}>
          {(quizes.data.length && (
            <div>
              <h3 className="text-2xl font-semibold">{`Question: ${
                currentQuestionIndex + 1
              }`}</h3>
              <h2 className="text-md mb-2">
                {quizes.data[currentQuestionIndex]?.question}
              </h2>
              <h6 className="text-[12px] mb-4 font-thin text-gray-500">
                {quizes.data[currentQuestionIndex]?.description}
              </h6>
              <div className="grid grid-cols-2 gap-4">
                {quizes.data[currentQuestionIndex]?.options.map(
                  (option: string, index: number) => (
                    <Button
                      placeholder={""}
                      key={index}
                      size={"sm"}
                      variant={
                        userResponses[currentQuestionIndex]?.selectedAnswer ===
                        option
                          ? "filled"
                          : "outlined"
                      }
                      color={
                        userResponses[currentQuestionIndex]?.selectedAnswer ===
                        option
                          ? "green"
                          : "gray"
                      }
                      className="text-left"
                      onClick={() =>
                        handleOptionSelect(
                          quizes.data[currentQuestionIndex]?.question,
                          option as string
                        )
                      }
                    >
                      {option as string}
                    </Button>
                  )
                )}
              </div>
            </div>
          )) || (
            <div className="flex justify-center items-center w-full h-full">
              No Quiz Found
            </div>
          )}
        </DialogBody>
        <DialogFooter placeholder={"Hello"}>
          {(quizes.data.length && (
            <div className="flex space-x-4 justify-end">
              {currentQuestionIndex > 0 && (
                <Button
                  placeholder={""}
                  size="sm"
                  onClick={handlePreviousQuestion}
                >
                  Previous
                </Button>
              )}
              {currentQuestionIndex < quizes.data.length - 1 ? (
                <Button placeholder={""} size="sm" onClick={handleNextQuestion}>
                  Next
                </Button>
              ) : (
                <Button
                  placeholder={""}
                  size="sm"
                  onClick={handleQuizSubmission}
                >
                  Submit
                </Button>
              )}
            </div>
          )) || (
            <div className="flex justify-end">
              <Button placeholder={""} size="sm" onClick={handleOpen}>
                Close
              </Button>
            </div>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
