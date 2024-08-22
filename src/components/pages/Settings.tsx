import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Dropzone } from "../common/forms/Dropzone";
import { FiChevronDown } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

interface EmailForm {
  display_name: string;
  bio: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
}

const Settings = () => {
  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      display_name: "",
      bio: "",
      first_name: "",
      last_name: "",
      email: "",
      country: "",
    },
  });

  const onSubmit = (values: EmailForm) => {
    values;
  };

  return (
    <Flex justifyContent="center" p="10">
      <Flex
        as="form"
        direction="column"
        w={{ base: "100%", md: "500px" }}
        gap="3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>
          <Tabs variant="unstyled">
            <TabList bgColor="white" borderRadius={15}>
              <Tab _selected={{ color: "purple" }}>Profile</Tab>
              <Tab _selected={{ color: "purple" }}>Account</Tab>
              <Tab _selected={{ color: "purple" }}>Membership</Tab>
              <Tab _selected={{ color: "purple" }}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<FiChevronDown />}
                    border="none"
                    background="transparent"
                  >
                    More
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Download</MenuItem>
                  </MenuList>
                </Menu>
              </Tab>
            </TabList>
            <TabPanels mt={5} bgColor="white" borderRadius={15}>
              <TabPanel>
                <Flex direction="column" gap="5">
                  <Text fontStyle="italic">This is how others will see you on the site</Text>
                  <Box>
                    <Text mb={2} fontSize="lg" fontWeight={600}>Picture</Text>
                    <Flex alignItems="center" gap="4">
                      <Box>
                        <Avatar size="lg" />
                      </Box>
                      <Button>Upload</Button>
                      <IconButton
                        variant="outline"
                        aria-label="Delete"
                        icon={<FaTrash />}
                      />
                    </Flex>
                  </Box>
                  <Flex direction="column" gap="2">
                    <Text fontSize="lg" fontWeight={600}>Display Name</Text>
                    <Controller
                      name="display_name"
                      control={control}
                      defaultValue="David McKenzie-James"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          name="display_name"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    <Text fontSize="sm" fontWeight={500} color="blackAlpha.700">
                      This is your public display name. It can be your real name or a pseudonym.
                    </Text>
                  </Flex>
                  <Flex direction="column" gap="2">
                    <Text fontSize="lg" fontWeight={600}>Bio</Text>
                    <Controller
                      name="bio"
                      control={control}
                      defaultValue="Co-Founder of DJfan"
                      render={({ field: { onChange, value } }) => (
                        <Textarea
                          name="bio"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Flex>
                  <Button
                    mb="5"
                    w="200px"
                    colorScheme="pink"
                    bgColor="rgb(191, 40, 241)"
                    color="rgb(254, 187, 255)"
                  >
                    Update Profile
                  </Button>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction="column" gap="5">
                  <Box>
                    <Text fontSize="2xl" fontWeight={600}>
                      Manage Your Profile
                    </Text>
                    <Text>Update your basic details</Text>
                  </Box>
                  <Divider />
                  <Box>
                    <Text>Picture</Text>
                    <Flex gap="2">
                      <Box>
                        <Avatar size="lg" />
                      </Box>
                      <Box flex={1}>
                        <Dropzone />
                      </Box>
                    </Flex>
                  </Box>
                  <Controller
                    name="first_name"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <InputGroup>
                          <InputLeftAddon children="First Name" />
                          <Input name="first_name" value={value} onChange={onChange} />
                        </InputGroup>
                        {error ? (
                          <Text fontSize="xs" colorScheme="red">
                            {error.message}
                          </Text>
                        ) : null}
                      </>
                    )}
                  />
                  <Controller
                    name="last_name"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <InputGroup>
                          <InputLeftAddon children="Last Name" />
                          <Input name="last_name" value={value} onChange={onChange} />
                        </InputGroup>
                        {error ? (
                          <Text fontSize="xs" colorScheme="red">
                            {error.message}
                          </Text>
                        ) : null}
                      </>
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <InputGroup>
                          <InputLeftAddon children="Email" />
                          <Input name="email" value={value} onChange={onChange} />
                        </InputGroup>
                        {error ? (
                          <Text fontSize="xs" colorScheme="red">
                            {error.message}
                          </Text>
                        ) : null}
                      </>
                    )}
                  />
                  <Controller
                    name="country"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <InputGroup>
                          <InputLeftAddon children="Country" />
                          <Input name="country" value={value} onChange={onChange} />
                        </InputGroup>
                        {error ? (
                          <Text fontSize="xs" colorScheme="red">
                            {error.message}
                          </Text>
                        ) : null}
                      </>
                    )}
                  />
                  <Button colorScheme="purple">Save Profile Details</Button>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Settings;
