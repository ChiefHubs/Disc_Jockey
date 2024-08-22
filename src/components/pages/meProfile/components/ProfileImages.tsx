import { Flex, Avatar, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import AvatarEdit from "react-avatar-edit";
import AvatarEdit from "react-avatar-clip";
import { updateProfilePicture } from "../../../../hooks/useProfile";

type Props = {
  profileImage: string;
};

async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
}

const ProfileImages = ({ profileImage }: Props) => {
  const [profileImageToDisplay, setProfileImageToDisplay] =
    useState<string>(profileImage);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [isUpdatingProfileImage, setIsUpdatingProfileImage] =
    useState<boolean>(false);

  useEffect(() => {
    setProfileImageToDisplay(profileImage);
  }, [profileImage]);

  const handleProcessImage = async () => {
    if (newProfileImage) {
      const objectURL = URL.createObjectURL(newProfileImage);
      setProfileImageToDisplay(objectURL);
    }
  };

  useEffect(() => {
    handleProcessImage();
  }, [newProfileImage]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSaveChange = async () => {
    if (!newProfileImage) {
      return;
    }
    try {
      const res = await updateProfilePicture(newProfileImage);
      if (res) {
        setIsUpdatingProfileImage(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: "20px", md: "40px" }}
    >
      <Flex direction="column" gap="10px" alignItems="flex-start">
        <Box fontSize="16px" fontWeight="600" lineHeight="1em">
          Profile Image
        </Box>
        {isUpdatingProfileImage ? (
          <AvatarEdit
            width={150}
            height={150}
            imageWidth={150}
            onCrop={async (newImage) => {
              const res = await dataUrlToFile(newImage, "avatar.png");
              setNewProfileImage(res);
            }}
            onClose={() => {
              setIsUpdatingProfileImage(false);
            }}
            // onBeforeFileLoad={(elem) => {
            //   if (elem.target.files && elem.target.files.length > 0) {
            //     const file = elem.target.files[0];
            //     if (file.size > 10000) {
            //       alert("File is too big!");
            //       elem.target.value = "";
            //     }
            //   }
            // }}
          />
        ) : (
          <Avatar size="xl" src={profileImageToDisplay} />
        )}
        <Box
          color="#fff"
          as="a"
          mt="5px"
          cursor="pointer"
          bg="#111"
          fontSize="10px"
          fontWeight="600"
          px="8px"
          py="6px"
          borderRadius="5px"
          lineHeight="1em"
          _hover={{ bg: "#8553f4" }}
          onClick={async () => {
            if (isUpdatingProfileImage) {
              await onSaveChange();
            } else {
              setIsUpdatingProfileImage(true);
            }
          }}
        >
          {isUpdatingProfileImage ? "Save Change" : "UPDATE IMAGE"}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProfileImages;
