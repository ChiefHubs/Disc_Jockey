import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Progress,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useDropzone } from "react-dropzone";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  createSupportTicket,
  deleteFile,
  getSupportToken,
  uploadFile,
} from "../../hooks/useSupport";
import { AxiosProgressEvent } from "axios";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".webp"],
    },
    maxFiles: 5,
  });
  const [supportToken, setSupportToken] = useState<string>("");
  const [ticketId, setTicketId] = useState<string>("");

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState<File[] | null>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedUserType, setSelectedUserType] = useState<string>("fan");
  const toast = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 0)
    );
    setProgress(percentCompleted);
  };

  const handleInitSupportToken = async () => {
    const token = await getSupportToken();
    setSupportToken(token as string);
  };

  useEffect(() => {
    handleInitSupportToken();
  }, []);

  useEffect(() => {
    if (acceptedFiles.length && supportToken.length) {
      handleUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  useEffect(() => {
    if (fileRejections.length) {
      toast({
        description:
          "Please upload only these accepted file types: png, jpg, jpeg, webp",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileRejections]);

  const handleUpload = async () => {
    const noDuplicateFiles = acceptedFiles.filter(
      (x) => !uploadedFiles.includes(x.name)
    );

    if (noDuplicateFiles.length === 0) {
      toast({
        description: "File already uploaded",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (noDuplicateFiles.length !== acceptedFiles.length) {
      toast({
        description: "Some files are already uploaded and will be skipped",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    setFileToUpload(noDuplicateFiles);
    setIsUploading(true);
    try {
      for (let i = 0; i < noDuplicateFiles.length; i++) {
        const res = await uploadFile(
          noDuplicateFiles[i],
          supportToken,
          onUploadProgress
        );
        const { data } = res;
        if (!data.result) {
          toast({
            description: data.message ?? "Error uploading file",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setProgress((i / noDuplicateFiles.length) * 100);
        setUploadedFiles((prev) => [...prev, noDuplicateFiles[i].name]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleDelete = async (fileName: string) => {
    const res = await deleteFile(supportToken, fileName);
    if (res.result) {
      setUploadedFiles((prev) => prev.filter((x) => x !== fileName));
    }
  };

  const handleReCaptchaVerify = async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const recaptchaToken = await executeRecaptcha("support");
    if (recaptchaToken) {
      const res = await createSupportTicket(supportToken, {
        user_type: selectedUserType,
        full_name: user?.display_name ?? fullName,
        email: user?.email ?? email,
        subject,
        description,
        recaptcha: recaptchaToken,
      });
      if (res.result) {
        toast({
          description: "Support ticket created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTicketId(res.ticket_id);
      }
    }
  };

  return (
    <>
      {ticketId == "" && (
        <Box>
          <Box
            m={{
              base: 3,
              md: 10,
            }}
            boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
          >
            <Box
              p={{
                base: 5,
                md: 10,
              }}
              borderBottom="1px solid #f5f5f5"
            >
              <Text fontWeight="bold" fontSize={20}>
                DJfan Support
              </Text>
              <Text fontWeight="500" lineHeight="1.8em" paddingTop="10px">
                We're here to support you. Let us know how we can assist or
                share your suggestions for enhancement. Please provide detailed
                information and/or screenshots to help us better grasp the
                issue. We'll address your support ticket promptly.
              </Text>
            </Box>
            <Box
              p={{
                base: 5,
                md: 10,
              }}
              borderBottom="1px solid #f5f5f5"
            >
              <FormControl
                width={{
                  base: "100%",
                  md: "350px",
                }}
              >
                <FormLabel>What category of user do you fall into?</FormLabel>
                <Select
                  placeholder="Select user type"
                  value={selectedUserType}
                  onChange={(e) => setSelectedUserType(e.target.value)}
                >
                  <option value="fan">Fan</option>
                  <option value="dj">DJ</option>
                  <option value="partner">Partner</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              {!user && (
                <>
                  <FormControl
                    width={{
                      base: "100%",
                      md: "350px",
                    }}
                    mt="20px"
                    isRequired
                  >
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl
                    width={{
                      base: "100%",
                      md: "350px",
                    }}
                    mt="20px"
                    isRequired
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </>
              )}
              <FormControl mt="20px" isRequired>
                <FormLabel>The issue in a few words.</FormLabel>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </FormControl>
              <FormControl mt="20px" isRequired>
                <FormLabel>Detailed description about the issue.</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl mt="20px">
                <FormLabel>
                  Upload any screenshots, allowed types: png, jpeg or webp (max
                  10Mb).
                </FormLabel>
                <Box>
                  <Box
                    border={
                      isDragActive ? "1px dashed #30096e" : "1px dashed #ccc"
                    }
                    borderRadius="10px"
                    backgroundColor={isDragActive ? "#f5f5f5" : "white"}
                    {...getRootProps()}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    minH="200px"
                  >
                    <input {...getInputProps()} />
                    <Text p="10px" textAlign="center">
                      Drag and drop some files here, or click to select files
                    </Text>
                  </Box>
                  {uploadedFiles ? (
                    <>
                      {uploadedFiles?.map((fileName, index) => {
                        return (
                          <Flex flexDirection="column" key={index}>
                            <Flex alignItems="center" mt="10px">
                              <FaTrash
                                onClick={async () =>
                                  await handleDelete(fileName)
                                }
                                cursor="pointer"
                              />
                              <Text ml="10px">{fileName}</Text>
                            </Flex>
                          </Flex>
                        );
                      })}
                    </>
                  ) : null}
                  {isUploading ? (
                    <>
                      {fileToUpload?.map((file, index) => (
                        <Box mt="10px" key={index}>
                          <Text mb="10px">Uploading {file?.name}</Text>
                        </Box>
                      ))}
                      <Progress hasStripe value={progress} />
                    </>
                  ) : null}
                </Box>
              </FormControl>
            </Box>
            <Box
              p={{
                base: 5,
                md: 10,
              }}
            >
              <Button
                colorScheme="purple"
                onClick={handleReCaptchaVerify}
                isDisabled={
                  !selectedUserType ||
                  !subject ||
                  !description ||
                  !supportToken ||
                  isUploading ||
                  (!user && !email) ||
                  (!user && !fullName)
                }
              >
                Submit ticket
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {ticketId != "" && (
        <Box>
          <Flex
            w="100%"
            h="100vh"
            maxH="100vh"
            pt={{ base: "90px", md: "180px" }}
            justifyContent="center"
            bg="#111111"
            position="relative"
            overflow="hidden"
          >
            <Stack
              spacing="6"
              color="white"
              w={{ base: "90%", md: "500px" }}
              maxW="425px"
            >
              <Stack spacing="3">
                <VStack
                  py="20px"
                  px={"10px"}
                  bgGradient="linear(to-r, #0b91b0 0%, #495aff 100%)"
                  borderRadius="10px"
                  border="1px solid cyan"
                  mb="15px"
                >
                  <Heading textAlign="center" fontSize="20px">
                    Support request received
                  </Heading>
                  <Text
                    textAlign="center"
                    fontSize={"18px"}
                    paddingBottom="8px"
                    paddingTop="8px"
                  >
                    Your ticket ID is: <Text fontWeight="bold">{ticketId}</Text>
                  </Text>
                  <Text
                    textAlign="center"
                    fontSize={"16px"}
                    lineHeight="1.7em"
                    paddingTop="4px"
                  >
                    Your request has been received and is currently being
                    processed by our dedicated support team. We understand the
                    importance of your issue and will work diligently to resolve
                    it as quickly as possible.
                  </Text>
                  <Text
                    textAlign="center"
                    fontSize={"16px"}
                    lineHeight="1.7em"
                    paddingTop="4px"
                  >
                    If you have any further questions or concerns, feel free to
                    reach out to us at{" "}
                    <a href="mailto:support@djfan.app">support@djfan.app</a>.
                    Our team is here to assist you every step of the way.
                  </Text>
                  <Text
                    textAlign="center"
                    fontSize={"16px"}
                    lineHeight="1.7em"
                    paddingTop="4px"
                  >
                    Thank you for your patience and understanding.
                  </Text>

                  <Button
                    colorScheme="purple"
                    onClick={() => {
                      navigate(`/feed`);
                    }}
                  >
                    Home
                  </Button>
                </VStack>
              </Stack>
            </Stack>
          </Flex>
        </Box>
      )}
    </>
  );
};

const SupportWithRecaptcha = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <Support />
    </GoogleReCaptchaProvider>
  );
};

export default SupportWithRecaptcha;
