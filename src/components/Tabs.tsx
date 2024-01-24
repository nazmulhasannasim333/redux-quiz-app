import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { QuizCard } from "./QuizCard";
import { DefaultStepper } from "./Stepper";
import { SelectModule } from "./SelectModule";
import { AddQuizForm } from "./AddQuizForm";
import { QuizModal } from "./QuizModal";
import { useGetAllModuleQuery } from "../redux/features/module/moduleApi";

type TModule = {
  _id: string;
  title: string;
};

export function QuizTabs() {
  const { data: modules, isLoading } = useGetAllModuleQuery(undefined);

  const steps = [
    {
      value: 0,
      name: "Quiz List",
      component: (
        <div className="flex justify-center">
          <SelectModule />
        </div>
      ),
    },
    {
      value: 1,
      name: "Add Quiz",
      component: (
        <div className="p-4">
          <AddQuizForm />
        </div>
      ),
    },
  ];

  const data = [
    {
      label: "Quiz List",
      value: "quiz-list",
      icon: Square3Stack3DIcon,
      desc: (
        <>
          {modules?.data?.map((module: TModule) => (
            <QuizCard key={module._id}>
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                className="mb-5"
              >
                {module.title}
              </Typography>
              <div className="flex justify-end">
                <QuizModal moduleId={module._id} />
              </div>
            </QuizCard>
          ))}
        </>
      ),
    },
    {
      label: "Add Quiz",
      value: "add-quiz",
      icon: Cog6ToothIcon,
      desc: (
        <QuizCard>
          <DefaultStepper steps={steps} />
        </QuizCard>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center h-full">
        <Spinner />
      </div>
    );

  return (
    <Tabs value="quiz-list">
      <TabsHeader placeholder={""}>
        {data.map(({ label, value, icon }) => (
          <Tab placeholder={""} key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody placeholder={""}>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
