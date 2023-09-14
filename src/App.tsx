import { Header } from "./components/Header/Header";
import { Box } from "@chakra-ui/react";
import { Todo } from "./components/Todo/Todo";
function App() {
  return (
    <Box>
      <Header />
      <Box mt={12}>
        <Todo />
      </Box>
    </Box>
  );
}

export default App;
