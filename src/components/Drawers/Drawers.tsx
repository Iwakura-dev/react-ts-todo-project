import { useRef } from "react";
import { useTodos } from "../../store/store";
import { useFormik } from "formik";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Button,
  useDisclosure,
  FormErrorMessage,
} from "@chakra-ui/react";

interface IInitialValues {
  todoText: string;
  descriptionText: string;
}
interface IFormikValues {
  initialValues: IInitialValues;
  validationSchema?: object;
  onSubmit: (values: IFormikValues, actions: IFormikValues) => void;
}

export const Drawers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | string>("");
  const descriptionRef = useRef<HTMLInputElement | string>("");
  const addTodo = useTodos((state) => state.addTodo);
  const handleAddTodo = () => {
    onClose();
    addTodo(inputRef.current.value, descriptionRef.current.value);
  };
  // Validation with formik package
  const formik = useFormik<IFormikValues>({
    initialValues: {
      todoText: "",
      descriptionText: "",
    },
    validationSchema: Yup.object({
      todoText: Yup.string()
        .required("Todo is required")
        .min(6, "Todo text not be short"),
      descriptionText: Yup.string()
        .required("Description is required")
        .min(6, "Description text not be short"),
    }),
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm();
    },
  });
  return (
    <>
      <Button
        ref={drawerRef}
        colorScheme={"gray"}
        variant={"outline"}
        onClick={onOpen}
      >
        Add Todo
      </Button>
      <Drawer
        isOpen={isOpen}
        placement={"right"}
        onClose={onClose}
        finalFocusRef={drawerRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Your Todo</DrawerHeader>
          <DrawerBody>
            <VStack onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.errors.todoText && formik.touched.todoText}
              >
                <FormLabel>Todo Text:</FormLabel>
                <Input
                  placeholder="Input Your Todo..."
                  type="text"
                  ref={inputRef}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                  {...formik.getFieldProps("todoText")}
                />
                <FormErrorMessage>{formik.errors.todoText}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.errors.descriptionText &&
                  formik.touched.descriptionText
                }
              >
                <FormLabel>Description Text:</FormLabel>
                <Input
                  placeholder="Input Your Description for your Todo..."
                  type="text"
                  ref={descriptionRef}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                  {...formik.getFieldProps("descriptionText")}
                />
                <FormErrorMessage>
                  {formik.errors.descriptionText}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant={"outline"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme={"purple"} onClick={handleAddTodo}>
              Add
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
