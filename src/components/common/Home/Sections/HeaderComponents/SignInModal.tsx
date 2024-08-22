import {
  ModalContent,
  ModalFooter,
  ModalBody,
  Link,
  ModalCloseButton,
  FormControl,
  InputRightElement,
  Input,
  InputGroup,
  Flex,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import SocialButtons from "../../Forms/SocialButtons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function SignInModal() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <ModalContent pt="20px" mx={{ base: "20px", md: "0" }}>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="10px"
          px="0"
        >
          <Heading fontSize="24px">Welcome Back!</Heading>
          <Text align="center" fontSize="14px" color="#22A9FC" fontWeight="500">
            Sign in with:
          </Text>
          <SocialButtons />
          <Text fontSize="14px" color="#A3A3A3">
            or continue with email
          </Text>

          <Flex
            flexDirection="column"
            gap="10px"
            width={{ base: "80%", md: "70%" }}
          >
            <FormControl isRequired>
              <Input id="email" placeholder="Email" type="email" />
            </FormControl>

            <FormControl isRequired>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <InputRightElement>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <span style={{ fontSize: "14px" }}>
                        <FaEye />
                      </span>
                    ) : (
                      <span style={{ fontSize: "14px" }}>
                        <FaEyeSlash />
                      </span>
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              background="#9E03C9"
              color="white"
              _hover={{
                background:
                  "-webkit-linear-gradient(111deg, hsla(291, 79%, 51%, 1) 0%, hsla(240, 91%, 73%, 1) 100%);",
                color: "white",
              }}
            >
              SIGN IN
            </Button>
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent="center" p="0">
          <Link
            mt="10px"
            mb="20px"
            fontSize="12px"
            color="gray.400"
            fontWeight="600"
          >
            Forgot your password?
          </Link>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
