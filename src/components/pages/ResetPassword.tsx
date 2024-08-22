import { useParams, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useResetPassword } from "../../hooks/useUser";

const ResetPasswordPage = () => {
  const { hashKey } = useParams();
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const handleClick = () => setShow(!show);

  const updatePassword = () => {
    if (ref.current) {
      setLoading(true);
      onOpen();
    }
  };

  const onCancel = () => {
    setLoading(false);
    onClose();
  };

  const onConfirm = () => {
    if (ref.current) {
      useResetPassword(ref.current.value, hashKey || "");
      setLoading(false);
      onClose();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  if (!hashKey) {
    navigate("/");
    return null;
  }

  return (
    <Flex justifyContent="center" alignItems="center" w="100%" p="5">
      <Flex
        direction="column"
        w={{ base: "100%", md: "500px" }}
        mt="150px"
        gap="5"
      >
        <Box>
          <Text>Password reset:</Text>
          {/* <Text>{hashKey && hashKey}</Text> */}
        </Box>
        <InputGroup size="md">
          <Input
            ref={ref}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            border="2px solid rgb(48, 10, 110)"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              color="rgb(48, 10, 110)"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          isLoading={isLoading && isLoading}
          loadingText="Updating"
          color="white"
          bgColor="rgb(48, 10, 110)"
          _hover={{
            color: "rgb(48, 10, 110)",
            bgColor: "transparent",
            border: "2px solid rgb(48, 10, 110)",
          }}
          spinnerPlacement="start"
          onClick={() => updatePassword()}
        >
          Save
        </Button>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reset Password
            </AlertDialogHeader>

            <AlertDialogBody>
              Do you really want to reset password?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onCancel}>Cancel</Button>
              <Button colorScheme="purple" onClick={onConfirm} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default ResetPasswordPage;
