import {
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { FaBarcode } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import QRCode from "qrcode.react";
import { useRef } from "react";

type AppProps = {
  link: string;
};

export default function QRcode(props: AppProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const downloadQRCode = async function () {
    const canvas: HTMLCanvasElement =
      document.querySelector("canvas") || document.createElement("canvas");
    const dataUrl = canvas.toDataURL("image/png", 1);
    const downloadLink = document.createElement("a");
    downloadLink.download = "qrcode.png";
    downloadLink.href = dataUrl;
    downloadLink.click();
  };

  return (
    <>
      <Button
        rightIcon={<FaBarcode />}
        bg="#111111"
        borderWidth="0px"
        color="#ffffff"
        mt="10px"
        onClick={onOpen}
        _active={{
          border: "4px solid green",
        }}
        _hover={{
          bg: "#5DE59A",
          color: "#ffffff",
        }}
      >
        Show pass (QR code)
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="300px">
          <Box
            as="a"
            onClick={onClose}
            position="absolute"
            top="15px"
            right="15px"
            color="#ffffff"
            border="1px solid #ffffff"
            borderRadius="5px"
            cursor="pointer"
            p="2px"
            _hover={{ border: "1px solid #111111", color: "#ffffff" }}
          >
            <GrClose />
          </Box>
          <ModalBody>
            <Flex
              flexDirection="column"
              py="15px"
              alignItems="center"
              gap="20px"
            >
              <Box
                paddingTop={10}
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 256,
                  width: "100%",
                }}
              >
                <QRCode
                  level="H"
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={props?.link}
                  viewBox={`0 0 256 256`}
                />
              </Box>

              {/*
              <Link onClick={walletApple}>Add to Apple Wallet </Link>
              <Link onClick={walletGoogle}>Add to Google Wallet </Link>
              */}
              <Button
                as="a"
                onClick={downloadQRCode}
                colorScheme="purple"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                Save QR code
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
