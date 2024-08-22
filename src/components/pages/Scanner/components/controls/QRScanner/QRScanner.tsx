import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import "./QRScanner.scss";
import { Box, Flex } from "@chakra-ui/react";

interface propQRScanner {
  callback(scannedText: string): void;
  flashlight: boolean;
}

const QRScanner = ({ callback, flashlight }: propQRScanner) => {
  const videoElementRef = useRef(null);
  const [scannedText, setScannedText] = useState("");
  const [scanner, setScanner] = useState<QrScanner>();

  useEffect(() => {
    if (scanner) {
      if (flashlight) {
        scanner.turnFlashOn();
      } else {
        scanner.turnFlashOff();
      }
    }
  }, [flashlight]);

  useEffect(() => {
    if (videoElementRef.current) {
      const video: HTMLVideoElement = videoElementRef.current;
      const qrScanner = new QrScanner(
        video,
        (result) => {
          callback(result.data);
          setScannedText(result.data);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      setScanner(qrScanner);
      qrScanner.start();
      return () => {
        qrScanner.turnFlashOff();
        qrScanner.stop();
        qrScanner.destroy();
      };
    }
  }, []);

  return (
    <Flex style={{ width: "100%" }}>
      <Box className="videoWrapper">
        <video className="qrVideo" ref={videoElementRef} />
      </Box>
    </Flex>
  );
};

export default QRScanner;
