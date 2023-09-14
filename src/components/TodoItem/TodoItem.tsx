import { Container, Box, Text, Button, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useTodos } from "../../store/store";

interface ITodoItemProps {
  title: string;
  description: string;
  id: string;
  index?: string;
}

export const TodoItem: React.FC<ITodoItemProps> = ({
  title,
  description,
  id,
}) => {
  const removeTodo = useTodos((state) => state.removeTodo);
  const handleRemoveItem = () => {
    removeTodo(id);
  };
  return (
    <Container shadow={"lg"} rounded={"md"}>
      <Box
        p={4}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <VStack align={"start"} spacing={1}>
          <Text fontSize={"24px"} fontWeight={"bold"}>
            {title}
          </Text>
          <Text fontSize={"14px"} fontWeight={"light"}>
            {description}
          </Text>
        </VStack>
        <Button
          variant={"ghost"}
          colorScheme={"red"}
          onClick={handleRemoveItem}
        >
          <DeleteIcon w={6} h={6} color={"tomato"} />
        </Button>
      </Box>
    </Container>
  );
};
