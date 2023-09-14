import { useRef } from "react";
import { useTodos } from "../../store/store";
import { useForm, SubmitHandler } from "react-hook-form";
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
  FormErrorMessage,
  FormHelperText,
  VStack,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export const Drawers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const addTodo = useTodos((state) => state.addTodo);
  const handleAddTodo = () => {
    onClose();
    addTodo(inputRef.current.value, descriptionRef.current.value);
  };
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
            <FormControl>
              <VStack>
                <Input
                  placeholder="Input Your Todo..."
                  type="text"
                  name="todo"
                  ref={inputRef}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                />
                <Input
                  placeholder="Input Your Description for your Todo..."
                  type="text"
                  name="description"
                  ref={descriptionRef}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                />
              </VStack>
            </FormControl>
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
