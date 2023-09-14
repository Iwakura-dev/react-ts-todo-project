import { Drawers } from "../Drawers/Drawers";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Button,
  Container,
  Box,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Container maxW={"full"} shadow={"lg"} p={4} px={12}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <HStack spacing={"24px"}>
              <Button
                colorScheme={"gray"}
                variant={"ghost"}
                onClick={toggleColorMode}
              >
                {colorMode === "light" ? (
                  <MoonIcon w={8} h={8} />
                ) : (
                  <SunIcon w={8} h={8} />
                )}
              </Button>
              <Heading>Todo</Heading>
            </HStack>
          </Box>
          <Box>
            <Drawers />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
