import { create } from "zustand";
import { nanoid } from "nanoid";


type Todos = {
  id: string,
  title: string,
  description: string,
  created_at: Date,
}

interface ITodoStore {
  todos: Todos[],
  addTodo: (title: string, description: string) => void,
  removeTodo: (id: string) => void,
}


export const useTodos = create<ITodoStore>((set, get) => ({
  todos: [
    {
      id: nanoid(),
      title: "Create a project",
      description: "Hello world",
      created_at: new Date(),
    },
  ],
  addTodo: (title, description) =>
    set(() => {
      const newTodos = { id: nanoid(), title, description, created_at: new Date() };
      return {
        todos: [...get().todos, newTodos],
      };
    }),
  removeTodo: (id) => set(() => {
    const { todos } = get();
    return {
      todos: todos.filter(t => t.id !== id)
    }
  }),
}))

