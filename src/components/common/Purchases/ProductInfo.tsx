import {
  Box,
  Text,
  Button,
  Flex,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Portal,
  AccordionIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { Purchase } from "../../../hooks/usePurchases";
import { useState } from "react";
import apiClient from "../../../services/api-client";
import dayjs from "dayjs";

type ProductInfoProps = {
  purchaseItem: Purchase;
};

const ProductInfo = ({ purchaseItem }: ProductInfoProps) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownloadPurchase = async (purchase: Purchase) => {
    setIsDownloading(true);
    try {
      const res = await apiClient.get(`/products/download/${purchase.product}`);
      const { data } = res;
      if (data.result) {
        const { result } = data;
        setTimeout(() => {
          window.open(result, "_blank");
        }, 100)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Flex
      position={"relative"}
      gap="0px"
      p="0"
      m="0"
      borderTop={"2px solid black"}
    >
      {/* <Flex w="80%"> */}
      <Button
        w="100%"
        borderRadius="0"
        // borderRight={"2px"}
        bg="#fff"
        fontSize={"16px"}
        gap="4px"
        color="#111111"
        fontWeight={"800"}
        _hover={{
          background: "#be04f1",
          borderColor: "#06d6a0",
          borderRight: "2px solid black",
          color: "white",
          transition: "0s",
        }}
        isLoading={isDownloading}
        onClick={async () => await handleDownloadPurchase(purchaseItem)}
      >
        DOWNLOAD
        <Box fontSize={"18px"}>
          <HiOutlineDownload />
        </Box>
      </Button>

      <Flex
        w="20%"
        flexDir={"column"}
        justify={"space-evenly"}
        _hover={{
          background: "#111",
          color: "#fff",
        }}
      >
        <Popover placement="top">
          <PopoverTrigger>
            <Box display="flex" alignSelf="center" cursor={"pointer"}>
              <FaInfoCircle fontSize={"24px"} />
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              maxW="200px"
              overflow={"hidden"}
              border={"2px solid #8338ec"}
              mr="20px"
            >
              <PopoverCloseButton
                top={"6px"}
                right={"3px"}
                color={"#fff"}
                size={"sm"}
              />
              <PopoverArrow />
              <PopoverHeader
                fontSize={"14px"}
                bg="#111"
                color="#fff"
                fontWeight={"700"}
                px="10px"
              >
                Track Information
              </PopoverHeader>
              <PopoverBody p="0">
                <VStack align="flex-start" px="10px" pt="10px" pb="15px">
                  <Box fontWeight={"500"} fontSize={"12px"}>
                    <Text fontWeight={"700"}>Release Date:</Text>
                    <Text>
                      {dayjs(
                        purchaseItem?.release_date
                          ? new Date(purchaseItem?.release_date)
                          : new Date()
                      ).format("DD/MM/YYYY")}
                    </Text>
                  </Box>
                  <Box fontWeight={"500"} fontSize={"12px"}>
                    <Text fontWeight={"700"}>Label:</Text>
                    <Text>{purchaseItem?.label ?? ""}</Text>
                  </Box>
                  <Box fontWeight={"500"} fontSize={"12px"}>
                    <Text fontWeight={"700"}>Credits:</Text>
                    <Text>{purchaseItem?.credits ?? ""}</Text>
                  </Box>
                  <Box fontWeight={"500"} fontSize={"12px"}>
                    <Text fontWeight={"700"}>Name:</Text>
                    <Text>{purchaseItem?.description ?? ""}</Text>
                  </Box>
                </VStack>
                <Accordion allowToggle>
                  <AccordionItem border="0">
                    <Box>
                      <AccordionButton
                        fontSize={"14px"}
                        fontWeight={"700"}
                        bg="#3a0ca3"
                        textAlign="center"
                        display={"flex"}
                        justifyContent={"center"}
                        py="4px"
                        color="white"
                        flex="1"
                        _hover={{ bg: "#b429f9" }}
                        _expanded={{ bg: "#b429f9", color: "white" }}
                      >
                        Order Details
                        <AccordionIcon fontSize={"24px"} />
                      </AccordionButton>
                    </Box>
                    <AccordionPanel
                      as={VStack}
                      align={"flex-start"}
                      py="10px"
                      px="10px"
                      gap="5px"
                    >
                      <HStack fontWeight={"500"} gap="4px" fontSize={"12px"}>
                        <Text fontWeight={"800"}>Amount:</Text>
                        <Text>${purchaseItem?.amount ?? ""}</Text>
                      </HStack>
                      <Divider borderColor={"#c2c2c2"} />
                      <HStack fontWeight={"500"} gap="4px" fontSize={"12px"}>
                        <Text fontWeight={"800"}>Purchased:</Text>
                        <Text>
                          {dayjs(new Date(purchaseItem.purchased_date)).format(
                            "DD/MM/YY"
                          )}
                        </Text>
                      </HStack>
                      <Divider borderColor={"#c2c2c2"} />
                      <HStack fontWeight={"500"} gap="4px" fontSize={"12px"}>
                        <Text fontWeight={"800"}>SKU:</Text>
                        <Text>{purchaseItem?.sku ?? ""}</Text>
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default ProductInfo;
