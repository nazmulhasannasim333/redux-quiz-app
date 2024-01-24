import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";

import { AddModuleForm } from "./AddModuleForm";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useAddModuleMutation } from "../redux/features/module/moduleApi";
import { setNewModule } from "../redux/features/module/moduleSlice";

export function AddModuleModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const [addModule] = useAddModuleMutation();
  const { newModule } = useAppSelector((state) => state.module);

  const handleOpen = () => setOpen(!open);

  const handleCancel = () => {
    dispatch(setNewModule(""));
    handleOpen();
  };

  const handleSubmit = async () => {
    await addModule({
      title: newModule,
    });
    dispatch(setNewModule(""));
    handleOpen();
    toast.success("Module Added Successfully");
  };

  return (
    <>
      <Button
        placeholder={""}
        onClick={handleOpen}
        variant="gradient"
        size="sm"
      >
        Add Module
      </Button>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <DialogBody placeholder={""}>
          <AddModuleForm />
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button
            placeholder={""}
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            disabled={!newModule}
            placeholder={""}
            variant="gradient"
            color="green"
            onClick={handleSubmit}
          >
            <span>Add Module</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
