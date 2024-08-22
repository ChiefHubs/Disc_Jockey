import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  CloseButton,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { color, wrap } from "framer-motion";

const RightSidebarModal = ({
  isOpen,
  onClose,
  flag,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  countries,
  setCountryCode,
  setCountryName,
}) => {
  const [result, setResult] = useState("");
  const [countryList, setCountryList] = useState(countries);
  const [filterTitle, setFilterTitle] = useState(
    flag == 0 ? "Location" : "Date"
  );
  const [dateRange, setDateRange] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
  ]);

  useEffect(() => {
    setFilterTitle(flag === 0 ? "Location" : "Date");
  }, [flag]);

  useEffect(() => {
    if (startDate == "" && endDate == "") {
      resetDate();
    }
  }, []);

  useEffect(() => {
    setCountryList(countries);
  }, [countries]);

  const resetDate = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    setDateRange([
      {
        startDate: today,
        endDate: nextWeek,
        key: "selection",
      },
    ]);
  };

  const handleWeekEnd = () => {
    // Get the current date
    const today = new Date();

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = today.getDay();

    // Calculate the date of Friday
    const dayFriday = new Date(today);
    dayFriday.setDate(today.getDate() + ((5 + 7 - dayOfWeek) % 7));
    console.log("This Friday is: " + dayFriday.toLocaleDateString());
    setStartDate(dayFriday);
    // Calculate the date of Sunday
    const daySunday = new Date(today);
    daySunday.setDate(today.getDate() + ((7 + 7 - dayOfWeek) % 7));
    console.log("This Sunday is: " + daySunday.toLocaleDateString());
    setEndDate(daySunday);
    setDateRange([
      {
        startDate: dayFriday,
        endDate: daySunday,
        key: "selection",
      },
    ]);
    onClose();
  };

  const showResult = () => {
    setStartDate(dateRange[0].startDate);
    setEndDate(dateRange[0].endDate);
    console.log("dateRange-------", dateRange);
    onClose();
  };

  const handleLocationFilter = (e) => {
    const filter = e.target.value;
    if (filter === "") {
      setCountryList(countries);
    } else {
      const filterCountries = countryList.filter((country) => {
        return country.country.toLowerCase().includes(filter.toLowerCase());
      });
      console.log("his----", filterCountries);
      setCountryList(filterCountries);
    }
  };

  const handleLocationClick = (name, code) => {
    setCountryCode(code);
    setCountryName(name);
    onClose();
  };
  return (
    <>
      <Box
        position="fixed"
        right={0}
        top={0}
        width="380px"
        height="100%"
        bg="white"
        boxShadow="-4px 0 10px rgba(0, 0, 0, 0.1)"
        transform={isOpen ? "translateX(0)" : "translateX(100%)"}
        transition="transform 0.3s ease-in-out"
        zIndex={100}
        p={4}
        backgroundColor={"#161616"}
      >
        <VStack align="stretch" spacing={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="xl" fontWeight="bold" color={"white"}>
              {filterTitle} Filters
            </Text>
            <CloseButton color={"white"} onClick={onClose} />
          </Box>
          {flag === 0 ? (
            <>
              <Input
                placeholder="Enter country"
                size="md"
                color={"white"}
                onChange={handleLocationFilter}
              />
              <Flex flexDirection={"column"}>
                {countryList.map((country) => {
                  return (
                    <Button
                      my={1}
                      background={"transparent"}
                      color={"white"}
                      onClick={() =>
                        handleLocationClick(
                          country.country,
                          country.country_code
                        )
                      }
                    >
                      <p color="white" style={{ "text-wrap": "wrap" }}>
                        {country.country}
                      </p>
                    </Button>
                  );
                })}
              </Flex>
            </>
          ) : (
            <>
              <Button
                colorScheme="transparent"
                border="2px"
                borderColor="green.500"
                borderRadius="20px"
                onClick={() => {
                  handleWeekEnd();
                }}
              >
                {`This Weekend`}
              </Button>
              <DateRange
                editableDateInputs={false}
                onChange={(item) => {
                  setDateRange([item.selection]);
                  console.log("item-------", item);
                }}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                showSelectionPreview={true}
                showDateDisplay={false}
              />
              <Flex justifyContent={"space-around"}>
                <Button
                  colorScheme="transparent"
                  border="2px"
                  borderColor="green.500"
                  borderRadius="20px"
                  onClick={() => resetDate()}
                >
                  {`Reset`}
                </Button>
                <Button
                  colorScheme="transparent"
                  border="2px"
                  borderColor="green.500"
                  borderRadius="20px"
                  onClick={() => showResult()}
                >
                  {`Show ${result} Result`}
                </Button>
              </Flex>
            </>
          )}
        </VStack>
      </Box>
      {/* <Box
        position="fixed"
        top={0}
        zIndex={99}
        width={"100%"}
        height={"100%"}
        backgroundColor={"black"}
        opacity={0.5}
      >
        fdsa
      </Box> */}
    </>
  );
};

export default RightSidebarModal;
