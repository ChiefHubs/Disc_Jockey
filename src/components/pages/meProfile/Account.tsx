import {
  Input,
  Flex,
  Text,
  Button,
  Divider,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import {
  useUser,
  useUserCheck,
  useUserEmailChange as changeEmail,
  useUserNameChange as changeUserName,
  useUserPasswordReset as resetPassword,
  // updateUserFirstNameLastName,
  updateUserNames,
} from "../../../hooks/useUser";
import {
  BiEnvelope,
  BiKey,
  BiSolidSave,
  // BiSolidUserAccount,
  // BiSolidUserDetail,
  BiUser,
} from "react-icons/bi";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  // AlertDialogCloseButton,
} from "@chakra-ui/react";
import apiClient from "../../../services/api-client";
import ProfileImages from "./components/ProfileImages";

type AccountProps = {
  onChangeUsername: () => Promise<void>;
};

export const Account = ({ onChangeUsername }: AccountProps) => {
  const { data: user, refetch: reloadUserData } = useUser();
  const [firstName, setFirstName] = useState<string>(user?.first_name || "");
  const [lastName, setLastName] = useState<string>(user?.last_name || "");
  const [displayName, setDisplayName] = useState<string>(
    user?.display_name || ""
  );
  const [username, setUsername] = useState<string>("");
  const [onTouched, setTouched] = useState<boolean>(false);
  const { data: userCheck, refetch } = useUserCheck(username);
  const toast = useToast();

  const deleteAccount = async function () {
    try {
      const res = await apiClient.delete(`/me/delete_account`);
      if (res.data.result) {
        window.open("https://fan.djfan.app", "_self");
      } else {
        console.log("delete account failed! ");
      }
    } catch (e) {
      return null;
    }
    console.log("delete account");
  };

  const handleSubmit = async () => {
    try {
      await changeUserName(username);
      await onChangeUsername();
      toast({
        title: "Saved!",
        status: "success",
        duration: 3000,
      });
    } catch (e) {
      toast({
        title: "Error!",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleChangeName = async () => {
    try {
      // await updateUserFirstNameLastName(firstName, lastName);
      await updateUserNames(firstName, lastName, displayName);
      await reloadUserData();
      toast({
        title: "Saved!",
        status: "success",
        duration: 3000,
      });
    } catch (e) {
      toast({
        title: "Error!",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    refetch();
  };

  const handleChangeDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    refetch();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const isValidUsername = useMemo(() => {
    const testRes = /^[a-zA-Z0-9\-_]{3,50}$/.test(username);
    if (!testRes) {
      return false;
    }
    return !!userCheck;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleChangeEmail = async () => {
    try {
      await changeEmail();
      toast({
        title: "Email send!",
        status: "success",
        duration: 3000,
      });
    } catch (e) {
      toast({
        title: "Error!",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword();
      toast({
        title: "Email send!",
        status: "success",
        duration: 3000,
      });
    } catch (e) {
      toast({
        title: "Error!",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Flex
        direction="column"
        mx="auto"
        p="5"
        gap="5"
        w={{ base: "100%", md: "500px" }}
        border="1px solid black"
        borderRadius={15}
      >
        <ProfileImages profileImage={user?.avatar || ""} />
        <Flex direction="column" gap="2">
          <Text fontSize="lg" fontWeight="600">
            Account Details
          </Text>
          <Flex direction="column" gap="2" paddingTop={2}>
            <Text fontSize="sm" fontWeight="600">
              Email
            </Text>
            <Text fontSize="md" fontWeight="600" paddingLeft={2}>
              {user?.email && user.email}
            </Text>
          </Flex>
          <Flex direction="column" gap="1">
            <Text fontSize="sm" fontWeight="600">
              First name
            </Text>
            <Input
              value={firstName}
              onChange={handleChangeFirstName}
              placeholder="First name"
              w="100%"
            />
          </Flex>
          <Flex direction="column" gap="1">
            <Text fontSize="sm" fontWeight="600">
              Last name
            </Text>
            <Input
              value={lastName}
              onChange={handleChangeLastName}
              placeholder="Last name"
              w="100%"
            />
          </Flex>
          {user?.dj != true && (
            <Flex direction="column" gap="1">
              <Text fontSize="sm" fontWeight="600">
                Display name
              </Text>
              <Input
                value={displayName}
                onChange={handleChangeDisplayName}
                placeholder="Dispay name"
                w="100%"
              />
            </Flex>
          )}
          <Button
            mt="1"
            w="100%"
            colorScheme="pink"
            bgColor="rgb(191, 40, 241)"
            color="rgb(254, 187, 255)"
            onClick={handleChangeName}
          >
            <BiSolidSave />
            Save
          </Button>
        </Flex>

        {/* 
        <Divider paddingBottom="6px" paddingTop="6px"></Divider>
        <Flex direction="column" gap="2" paddingTop={3}>
          <Text fontSize="lg" fontWeight="600">
            New Username
          </Text>
          <Input
            value={username}
            onChange={handleChangeUserName}
            placeholder="Username"
            w="100%"
            isInvalid={onTouched && !isValidUsername}
            focusBorderColor={isValidUsername ? "green" : "red"}
            errorBorderColor="red"
            onFocus={() => setTouched(true)}
          />
          {isValidUsername && (
            <Button
              mt="1"
              w="100%"
              colorScheme="pink"
              bgColor="rgb(191, 40, 241)"
              color="#fff"
              onClick={handleSubmit}
              disabled={!isValidUsername}
              _disabled={{ bgColor: "gray" }}
            >
              <BiSolidSave />
              Save
            </Button>
          )}
        </Flex>
        */}

        <Divider paddingBottom="6px" paddingTop="6px"></Divider>

        <Button
          w="100%"
          colorScheme="pink"
          bgColor="rgb(191, 40, 241)"
          color="#fff"
          onClick={handleChangeEmail}
        >
          <BiEnvelope /> Change Email Address
        </Button>

        <Divider paddingBottom="6px" paddingTop="6px"></Divider>

        <Button
          w="100%"
          colorScheme="pink"
          bgColor="rgb(191, 40, 241)"
          color="#fff"
          onClick={handleResetPassword}
        >
          <BiKey /> Reset Password
        </Button>

        <Divider paddingBottom="6px" paddingTop="6px"></Divider>

        <Button w="100%" color="#fff" colorScheme="red" onClick={onOpen}>
          <BiUser /> Delete My Account
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
              Delete My Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete your account? You can't undo this
              action afterwards. All subscriptions will be cancelled automaticly
              on deletion.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteAccount();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
