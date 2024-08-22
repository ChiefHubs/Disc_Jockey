import { SimpleGrid } from "@chakra-ui/react";
import { getMyPurchases } from "../../../hooks/usePurchases";
import PurschaseItem from "../../common/Purchases/PurchaseItem";
import NoPurchases from "../../common/Purchases/NoPurchases";

export const Purchases = () => {
  const { data: myPurchases, isLoading } = getMyPurchases({
    page: 1,
    pageSize: 10,
  });

  if (isLoading) return <></>;

  return (
    <SimpleGrid
      justifyContent="center"
      alignItems="center"
      columns={{ base: 1, md: 2, "2xl": 4 }}
      spacing="10"
    >
      {myPurchases?.length ? (
        myPurchases.map((purchase, index) => {
          return <PurschaseItem key={index} purchaseItem={purchase} />;
        })
      ) : (
        <NoPurchases />
      )}
    </SimpleGrid>
  );
};
