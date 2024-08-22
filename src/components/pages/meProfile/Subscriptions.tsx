import {
  Flex,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getMySubscriptionDetails } from "../../../hooks/useProfile";
import dayjs from "dayjs";
import ManageButton from "../../common/Subscriptions/ManageButton";
import { FaGem } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import NoSubscriptions from "../../common/Subscriptions/NoSubscriptions";

export enum AccessLevel {
  EVERYONE = 1,
  GOLD = 2,
  VIP = 3,
}

enum SubscriptionStatus {
  ACTIVE = 9,
  CANCELLED = 7,
}

export const Subscriptions = () => {
  const { data: mySubscriptions, isLoading } = getMySubscriptionDetails({
    // TODO: replace if infinite scroll is implemented
    page: 1,
    pageSize: 10,
  });

  if (isLoading) return <></>;

  const renderStatus = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return "Active";
      case SubscriptionStatus.CANCELLED:
        return "Cancelled";
      default:
        return "";
    }
  };

  return (
    <>
      {mySubscriptions?.length ? (
        <TableContainer
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          border="1px solid gray"
          flex="1"
          overflowY="auto"
        >
          <Table variant="simple" overflow="auto" maxH="calc(100vh - 260px)">
            <Thead position="sticky" top="0" color="#fff" bg="black">
              <Tr>
                <Th color={"white"}>Creator</Th>
                <Th color={"white"}>Status</Th>
                <Th color={"white"}>Started</Th>
                <Th color={"white"}>Amount</Th>
                <Th color={"white"}>Level</Th>
                <Th color={"white"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mySubscriptions?.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Link
                      to={`/artists/${item?.profile_url}`}
                      as={RouterLink}
                      fontWeight={"600"}
                    >
                      {item?.profile_url ?? ""}
                    </Link>
                  </Td>
                  <Td>{renderStatus(item?.status_id ?? 0)}</Td>
                  <Td>
                    {dayjs(new Date(item.created_at)).format("DD/MM/YYYY")}
                  </Td>
                  <Td>${item?.amount ?? ""}</Td>
                  <Td>
                    {item?.accesslevel === AccessLevel.VIP ? (
                      <Flex
                        color="#fff"
                        px="8px"
                        py="4px"
                        bg="-webkit-linear-gradient(90deg, hsla(280, 95%, 57%, 1) 0%, hsla(193, 90%, 55%, 1) 100%);
                            "
                        fontSize="14px"
                        w="60px"
                        textAlign={"center"}
                        alignItems={"center"}
                        fontWeight={"600"}
                        borderRadius={"5px"}
                        gap="4px"
                      >
                        <FaGem fontSize={"12px"} />
                        VIP
                      </Flex>
                    ) : (
                      <Text
                        color="#fff"
                        textAlign={"center"}
                        py="4px"
                        bg="#000"
                        fontSize="14px"
                        w="60px"
                        fontWeight={"600"}
                        borderRadius={"5px"}
                      >
                        {AccessLevel[item?.accesslevel ?? 1].toUpperCase()}
                      </Text>
                    )}
                  </Td>
                  <Td>
                    <ManageButton subscription={item} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <NoSubscriptions />
      )}
    </>
  );
};
