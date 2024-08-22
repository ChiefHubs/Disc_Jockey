import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import {
  ISubscription,
  getMySubscriptionDetails,
} from "../../../hooks/useProfile";
import apiClient from "../../../services/api-client";
import { AccessLevel } from "../../pages/meProfile/Subscriptions";
import VIPMembership from "../profile/VIPMembership";

type SubscriptionManageButtonProps = {
  subscription: ISubscription;
};

export default function ManageButton({
  subscription,
}: SubscriptionManageButtonProps) {
  const toast = useToast();
  const { refetch } = getMySubscriptionDetails({
    page: 1,
    pageSize: 10,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isVip = subscription?.accesslevel === AccessLevel.VIP;

  const onCancelSubscription = async () => {
    try {
      const res = await apiClient.patch(
        `/me/subscription/${subscription.id}/cancel`
      );
      if (res.data.result) {
        toast({
          title: "Subscription canceled",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        await refetch();
      }
    } catch (error) {
      console.log("onCancelSubscription", error);
    }
  };
  return (
    <>
      <Menu>
        <MenuButton>
          <Box
            p="0"
            display={"flex"}
            fontSize={"14px"}
            border="2px black solid"
            fontWeight={"600"}
            px="6px"
            py="3px"
            gap="5px"
            alignItems={"center"}
            borderRadius={"5px"}
          >
            Manage
          </Box>
        </MenuButton>
        <MenuList>
          {!isVip && (
            <MenuItem
              onClick={() => {
                onOpen();
              }}
            >
              Upgrade to VIP
            </MenuItem>
          )}
          {subscription?.status_id === 9 && (
            <MenuItem onClick={onCancelSubscription}>Cancel</MenuItem>
          )}
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VIPMembership isUpgrading={true} subscription={subscription} />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
