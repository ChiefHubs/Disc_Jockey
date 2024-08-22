import { Flex, Modal, ModalOverlay, ModalContent, VStack, Image, Box, Text, Button } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useState } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  onClose?: () => void;
  urlLocation?: string;
}

export default function LinkQrCode({ onClose = () => {}, urlLocation = "" }: Props) {
  const [modalVisible, setModalVisible] = useState(true);

  const downloadQRCode = async function () {
    const canvas: HTMLCanvasElement = document.querySelector("canvas") || document.createElement("canvas");
    const dataUrl = canvas.toDataURL("image/png", 1);
    const downloadLink = document.createElement("a");
    downloadLink.download = "qrcode.png";
    downloadLink.href = dataUrl;
    downloadLink.click();
  };

  return (
    <Modal isOpen={modalVisible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent border="1px solid #fff" overflow="hidden" borderRadius="10px" style={{ margin: "10px" }}>
        <VStack w="100%">
          <Flex position="absolute" right="10px" top="10px">
            <FiX color="#fff" onClick={onClose} fontSize="30px" cursor="pointer" />
          </Flex>
          <VStack bg="#111" w="100%" py="10px">
            <Image w="110px" src="https://files.djfan.app/images/logo/DJFAN_HOR_WHITE.svg" />
          </VStack>
          <VStack>
            <Text style={{ fontSize: "22px" }}> Link to profile </Text>
          </VStack>
          <VStack>
            <Text style={{ fontSize: "14px" }}> {urlLocation} </Text>
          </VStack>
          <VStack>
            <Box style={{ padding: "10px" }}>
              <QRCode
                level="H"
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={urlLocation}
                viewBox={`0 0 256 256`}
              />
            </Box>
          </VStack>
          <VStack>
            <Box style={{ marginBottom: "20px", marginTop: "10px" }}>
              <Button onClick={downloadQRCode}>Save</Button>
            </Box>
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
}
