import { useNavigate, useParams } from "react-router-dom";
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useEmailChange } from "../../hooks/useUser";

interface EmailForm {
  email: string;
}

const ChangeEmailPage = () => {
  const { hashKey } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const {
    control,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: EmailForm) => {
    if (/^\S+@\S+$/i.test(values.email)) {
      setLoading(true);
      onOpen();
    }
  };

  const onConfirm = () => {
    useEmailChange(getValues("email"), hashKey || "");
    setLoading(false);
    onClose();
  };

  const onCancel = () => {
    setLoading(false);
    onClose();
  };

  if (!hashKey) {
    navigate("/");
    return null;
  }

  return (
    <Flex justifyContent="center" w="100%">
      <Flex
        as="form"
        direction="column"
        mt="150px"
        w={{ base: "100%", md: "500px" }}
        gap="5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>
          <Text>Change email page hashKey :</Text>
          <Text>{hashKey && hashKey}</Text>
        </Box>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                border="2px solid rgb(48, 10, 110)"
                value={value}
                onChange={onChange}
              />
              {error ? <Text fontSize="xs">{error.message}</Text> : null}
            </>
          )}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Updating"
          color="white"
          bgColor="rgb(48, 10, 110)"
          _hover={{
            color: "rgb(48, 10, 110)",
            bgColor: "transparent",
            border: "2px solid rgb(48, 10, 110)",
          }}
          _disabled={{
            bgColor: "gray",
          }}
          isDisabled={!!errors.email}
          spinnerPlacement="start"
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
              Change Email
            </AlertDialogHeader>

            <AlertDialogBody>
              Do you really want to change email?
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

export default ChangeEmailPage;
