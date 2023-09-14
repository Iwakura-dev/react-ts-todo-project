import { VStack } from "@chakra-ui/react";
import { useTodos } from "../../store/store";
import { TodoItem } from "../TodoItem/TodoItem";

export const Todo: React.FC = () => {
  const todos = useTodos((state) => state.todos);
  return (
    <VStack>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            title={todo.title}
            description={todo.description}
            id={todo.id}
          />
        );
      })}
    </VStack>
  );
};
