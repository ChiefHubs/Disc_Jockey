import {
  Avatar,
  Flex,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  HStack,
  Spinner,
  As,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaRegCommentAlt } from "react-icons/fa";
import { FunctionComponent, MouseEvent, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useParams } from "react-router-dom";
import { Comment, useComments } from "../../../hooks/useComment";
import axios from "axios";
import { timeAgo } from "../../../helpers/timeAgo";
import { FiMoreVertical } from "react-icons/fi";
import { BiEdit, BiTrash } from "react-icons/bi";

interface CommentMenuProps {
  icon?: As;
  label: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const CommentMenu: FunctionComponent<CommentMenuProps> = ({
  icon,
  label,
  onClick,
}) => (
  <MenuItem py="10px" aria-label={label} onClick={onClick}>
    <Box as={icon} size="16px" mr="8px" />
    <Text>{label}</Text>
  </MenuItem>
);

export default function Comments() {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: userData } = useUser();
  const { postId } = useParams();
  const pageSize = 10;
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useComments(postId as string, { pageSize });
  const isAdmin = userData?.admin ?? false;
  const [commentID, setCommentID] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleComment = async () => {
    if (!postId || !newComment) return;
    if (isEditing) {
      try {
        await axios.put(
          `${import.meta.env.VITE_COMMENTS_API}/comments/${commentID}`,
          { comment: newComment }
        );
        await refetch();
        setNewComment("");
        setIsEditing(false);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    const commentToAdd: Comment = {
      _id: "",
      createdAt: new Date().toUTCString(),
      post_id: Number(postId),
      author_id: userData?.user_id ?? 1,
      author_name: userData?.display_name as string,
      author_avatar: userData?.avatar as string,
      comment: newComment,
    };
    setLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_COMMENTS_API + "/comments",
        commentToAdd
      );
      await refetch();
      setNewComment("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_COMMENTS_API}/comments/${commentId}`
      );
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestoreComment = async (commentId: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_COMMENTS_API}/comments/${commentId}/restore`
      );
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      bg="white"
      flexDirection={"column"}
      py="15px"
      gap="15px"
      px="15px"
      w="100%"
      borderBottomLeftRadius="15px"
      borderBottomRightRadius="15px"
      borderTop="2px solid #000"
    >
      <HStack w="100%" justifyContent={"space-between"}>
        <Text fontWeight="700" mr="5px" fontSize="16px">
          Discussion
        </Text>
        <HStack gap="18px">
          <Text
            lineHeight={"1em"}
            display="flex"
            alignContent={"center"}
            fontSize="14px"
            gap="4px"
            fontWeight={"500"}
            color="#6A6A6A"
          >
            {(comments?.pages ?? []).flat()?.length ?? 0}{" "}
            <FaRegCommentAlt fontSize="16px" />
          </Text>
        </HStack>
      </HStack>
      {comments?.pages.map((page, i) => (
        <Box key={i}>
          {page.map((comment: Comment) => (
            <Flex
              gap="8px"
              w="100%"
              position="relative"
              paddingRight={isAdmin ? "40px" : "0"}
              mt="3px"
              key={comment._id}
            >
              <Avatar
                width="30px"
                height="30px"
                mt="4px"
                src={comment.author_avatar}
              />
              <Flex flexDirection={"column"}>
                <Link as="span" fontWeight="700" mr="5px" fontSize="16px">
                  @{comment.author_name}
                </Link>
                <Text
                  fontSize={{
                    base: "12px",
                    md: "14px",
                  }}
                >
                  {timeAgo(comment.createdAt)}
                </Text>
                <Text
                  {...(comment.deleted && {
                    as: "i",
                    color: "gray.500",
                  })}
                >
                  {comment.deleted
                    ? "This post has been deleted by a moderator"
                    : comment.comment}
                </Text>
                {!comment.deleted && comment.edited && (
                  <Text as="i" fontSize="12px" color="gray.500" ml="1px">
                    (Edited by a moderator)
                  </Text>
                )}
              </Flex>
              {isAdmin && (
                <Menu>
                  <MenuButton
                    transition="all 0.3s"
                    _focus={{ boxShadow: "none" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    position="absolute"
                    right="0"
                    top="0"
                  >
                    <Box as={FiMoreVertical} size="20px" color="gray" />
                  </MenuButton>
                  <MenuList
                    minW="max-content"
                    fontSize="14px"
                    bg="white"
                    p="0"
                    m="0"
                    borderColor="gray.200"
                  >
                    <CommentMenu
                      icon={BiEdit}
                      label="Edit Comment"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCommentID(comment._id);
                        setIsEditing(true);
                        setNewComment(comment.comment);
                      }}
                    />
                    {comment.deleted ? (
                      <CommentMenu
                        icon={BiTrash}
                        label="Restore Comment"
                        onClick={async () => {
                          await handleRestoreComment(comment._id);
                        }}
                      />
                    ) : (
                      <CommentMenu
                        icon={BiTrash}
                        label="Delete Comment"
                        onClick={async () => {
                          await handleDeleteComment(comment._id);
                        }}
                      />
                    )}
                  </MenuList>
                </Menu>
              )}
            </Flex>
          ))}
        </Box>
      ))}
      {hasNextPage && (
        <Text
          fontSize="14px"
          px="15px"
          color="#7d5aeb"
          fontWeight={"500"}
          cursor="pointer"
          onClick={async () => {
            await fetchNextPage();
          }}
        >
          View more comments
        </Text>
      )}
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          fontSize="15px"
          type="text"
          bg="white"
          placeholder="Type your comment..."
          borderRadius="15px"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <InputRightElement width="3rem">
          <Box
            mr="10px"
            cursor="pointer"
            fontSize={"16px"}
            as="button"
            color="#7760e3"
            fontWeight="600"
            p="8px"
            onClick={handleComment}
          >
            {loading ? <Spinner /> : isEditing ? "Edit" : "Post"}
          </Box>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
