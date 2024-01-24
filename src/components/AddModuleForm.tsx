import { Card, Input, Typography } from "@material-tailwind/react";
import { useAppDispatch } from "../redux/hooks";
import { setNewModule } from "../redux/features/module/moduleSlice";

export function AddModuleForm() {
  const dispatch = useAppDispatch();

  return (
    <Card placeholder={""} color="transparent" shadow={false}>
      <Typography placeholder={""} color="gray" className="mt-1 font-normal">
        Please Add Your Module Here
      </Typography>
      <form className="mt-8 mb-2  w-full mx-auto ">
        <div className="mb-1 ">
          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Module Title <span className="text-red-500">*</span>
            </Typography>
            <Input
              onChange={(e) => dispatch(setNewModule(e.target.value))}
              crossOrigin={""}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </div>
      </form>
    </Card>
  );
}
