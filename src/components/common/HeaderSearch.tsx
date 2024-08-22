import {
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DJUser, useUserList as getUserList } from "../../hooks/useUser";
import useDebounce from "../../hooks/utils/useDebounce";
import { DJUsersContext } from "../../contexts/NavigationContext";

export default function HeaderSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [userList, setUserList] = useState<DJUser[]>([]);
  const debouceSearch = useDebounce(search);
  const { handleChangeDJUsers } = useContext(DJUsersContext);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (debouceSearch.length > 2) {
      getUserList(debouceSearch).then((res: DJUser[]) => {
        setUserList(res);
      });
    } else {
      setUserList([]);
    }
  }, [debouceSearch]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleClick = () => {
    onSearch();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const onSearch = () => {
    onClose();
    handleChangeDJUsers(userList);
    navigate("/dj_users");
  };

  const handleSelect = (djUser: DJUser) => {
    onClose();
    navigate(`/artists/${djUser.profile_url}`);
  };

  return (
    <Flex gap={5}>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <InputGroup
            w={{ base: "100%", sm: "150px", md: "200px" }}
            onClick={onToggle}
          >
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="on-accent" boxSize="6" />
            </InputLeftElement>
            <Input
              ref={inputRef}
              placeholder="Search"
              variant="filled"
              value={search}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                backgroundColor: "white",
              }}
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent
          w={{ base: "100%", sm: "150px", md: "200px" }}
          display={search.length ? "block" : "none"}
        >
          <PopoverBody>
            <Flex direction="column">
              {userList.map((DJUser, index) => (
                <Text
                  key={index}
                  cursor="pointer"
                  onClick={() => handleSelect(DJUser)}
                >
                  {DJUser.profile_url}
                </Text>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Button colorScheme="blue" onClick={handleClick}>
        Search
      </Button>
    </Flex>
  );
}
