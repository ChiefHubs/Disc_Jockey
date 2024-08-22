import { useEffect, useState } from "react";
import QRScanner from "./components/controls/QRScanner/QRScanner";
import { Box, Center, Flex, Button, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import { getEventCheck, getValidationQRCode, validationResult } from "../../../hooks/useScanner";
import dayjs from "dayjs";
import { FaRegSquareCheck } from "react-icons/fa6";
import { FiXSquare } from "react-icons/fi";

import { MdFlashlightOn } from "react-icons/md";
import { MdFlashlightOff } from "react-icons/md";

// import Header from "~/components/Header";

export default function Scanner() {
  const { event_key } = useParams();

  const [isOpen, setOpen] = useState(false);
  const [scannerBtnLabel, setScannerBtnLabel] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const [validationData, setValidationData] = useState<validationResult>();
  const [eventCheck, setEventCheck] = useState(0 as number);
  const [flashlight, setFlashlight] = useState<boolean>(false);

  useEffect(() => {
    if (event_key) {
      console.log("event_key", event_key);
      checkEvent(event_key);
    }
  }, [event_key]);

  useEffect(() => {
    if (!isOpen) {
      setScannerBtnLabel("QR Scanner On");
    } else {
      setScannerBtnLabel("QR Scanner Off");
    }
  }, [isOpen]);

  const toggleFlashlight = () => {
    setFlashlight(!flashlight);
  };

  const scannerOnOff = () => {
    setOpen(!isOpen);
  };

  const scannerResponse = (qrCode: string) => {
    if (qrCode != "") {
      scannerOnOff();
      setQrCode(qrCode);
      validateQRCode(qrCode);
    }
  };

  const checkEvent = async (event_key: string) => {
    if (event_key != "") {
      try {
        const res = await getEventCheck(event_key ?? "");
        const { data } = res;
        if (data) {
          setEventCheck(data.result ? 2 : 1);
        }
      } catch (error) {
        console.error("Event error:", error);
      }
    }
  };

  const validateQRCode = async (qrCode: string) => {
    if (event_key != "") {
      try {
        const res = await getValidationQRCode(event_key ?? "", qrCode);
        const { data } = res;
        if (data) {
          setValidationData(data);
        }
      } catch (error) {
        console.error("Error validating qr-code:", error);
      }
    }
  };

  const qrScanner = isOpen ? <QRScanner callback={scannerResponse} flashlight={true} /> : null;

  return (
    <>
      <Flex w="100%" h="100%" minH="100vh" flexDirection="column" bg="#343434" pb="50px">
        <Header />
        {eventCheck == 2 && (
          <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
            <Center>
              <Box style={{ fontSize: "24px", width: "100%", padding: "20px" }}>
                <Button colorScheme="blue" size="lg" onClick={scannerOnOff} style={{ fontWeight: "600" }}>
                  {scannerBtnLabel}
                </Button>
                {/*
                <Button colorScheme="blue" size="lg" onClick={toggleFlashlight} style={{ fontWeight: "600", margin: "20px" }}>
                  {!flashlight && (
                    <>
                      <MdFlashlightOn style={{ color: "#fff", fontSize: "20px" }} />
                    </>
                  )}
                  {flashlight && (
                    <>
                      <MdFlashlightOff style={{ color: "#fff", fontSize: "20px" }} />
                    </>
                  )}
                </Button>
                */}
              </Box>
            </Center>
          </Flex>
        )}
        {eventCheck == 1 && (
          <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
            <Center>
              <Box style={{ fontSize: "24px", width: "100%", padding: "20px" }}>Event URL is incorrect.</Box>
            </Center>
          </Flex>
        )}

        {!isOpen && validationData?.event_name && (
          <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
            <Box
              w="100%"
              style={{
                fontSize: "22px",
                width: "100%",
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "15px",
                margin: "10px",
                padding: "10px",
              }}
            >
              {validationData?.guestlist != null && (
                <Box>
                  <Center>
                    <Text style={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "32px", fontWeight: "600" }}>Guestlist pass</Text>
                  </Center>
                  {/* <Text>Name: {validationData?.guestlist?.name}</Text> */}
                  {validationData?.guestlist?.used === true && (
                    <>
                      <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                        <Center>
                          <FiXSquare style={{ color: "#D22B2B", fontSize: "200px" }} />
                        </Center>
                      </Flex>
                      <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                        <Center style={{ color: "#D22B2B", fontSize: "28px", fontWeight: "600" }}>QR already used</Center>
                      </Flex>
                    </>
                  )}
                  {validationData?.guestlist?.used === false && (
                    <>
                      <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                        <Center>
                          <FaRegSquareCheck style={{ color: "#0BDA51", fontSize: "200px" }} />
                        </Center>
                      </Flex>
                      <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                        <Center style={{ color: "#0BDA51", fontSize: "28px", fontWeight: "600" }}>QR valid</Center>
                      </Flex>
                    </>
                  )}
                </Box>
              )}
              {validationData?.backstagelist != null && (
                <Box>
                  <Center>
                    <Text style={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "32px", fontWeight: "600" }}>Backstage pass</Text>
                  </Center>
                  <Text>Name: {validationData?.backstagelist?.name}</Text>
                  {validationData?.backstagelist?.used === false && (
                    <>
                      <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                        <Center>
                          <FaRegSquareCheck style={{ color: "#0BDA51", fontSize: "200px" }} />
                        </Center>
                      </Flex>
                      <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                        <Center style={{ color: "#0BDA51", fontSize: "28px", fontWeight: "600" }}>QR valid</Center>
                      </Flex>
                    </>
                  )}
                  {validationData?.backstagelist?.used === true && (
                    <>
                      <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                        <Center>
                          <FiXSquare style={{ color: "#D22B2B", fontSize: "200px" }} />
                        </Center>
                      </Flex>
                      <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                        <Center style={{ color: "#D22B2B", fontSize: "28px", fontWeight: "600" }}>QR already used</Center>
                      </Flex>
                    </>
                  )}
                </Box>
              )}
              {validationData?.guestlist == null && validationData?.backstagelist == null && (
                <>
                  <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                    <Center>
                      <FiXSquare style={{ color: "#D22B2B", fontSize: "200px" }} />
                    </Center>
                  </Flex>
                  <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
                    <Center style={{ color: "#D22B2B", fontSize: "28px", fontWeight: "600" }}>QR not found</Center>
                  </Flex>
                </>
              )}

              <Box style={{ paddingTop: "16px" }}>
                <Text style={{ paddingTop: "4px" }}>{validationData?.event_name}</Text>
                <Text style={{ paddingTop: "4px" }}>{dayjs(validationData?.event_date).format("DD-MM-YYYY")}</Text>
                <Text style={{ paddingTop: "4px" }}>{validationData?.venue}</Text>
              </Box>
            </Box>
          </Flex>
        )}

        <Flex w="100%" justifyContent="center" flexDirection="column" alignItems="center">
          <Box w={{ base: "100%", sm: "500px" }} style={{ fontSize: "24px", width: "100%" }}>
            <Center>
              <Box>
                <Box>{qrScanner}</Box>
              </Box>
            </Center>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
