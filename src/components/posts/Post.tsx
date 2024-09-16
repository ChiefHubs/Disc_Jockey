import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Text,
  Link,
  As,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Center,
} from "@chakra-ui/react";
import {
  FunctionComponent,
  MouseEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post as IPost, PostVariant, deletePost } from "../../hooks/usePosts";
import { useProfile } from "../../hooks/useProfile";
import AudioContent from "./post-variants/AudioContent";
import ImagesContent from "./post-variants/ImagesContent";
import TextContent from "./post-variants/TextContent";
import VideoContent from "./post-variants/VideoContent";
import {
  FiHeadphones,
  FiDownload,
  FiEye,
  FiMoreVertical,
  FiShare,
} from "react-icons/fi";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import {
  BiSolidLock,
  BiSpeaker,
  // BiSolidLockOpen,
  // BiBorderBottom,
  // BiChat,
  BiEdit,
  // BiLike,
  // BiShare,
  BiTrash,
} from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUpdatePostState as updatePostState } from "../../hooks/useFeeds";
import { Link as RouterLink } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import apiClient from "../../services/api-client";
// import { useCookies } from "react-cookie";
// import CreateFreeAccount from "../common/Buttons/CreateFreeAccount";
import SignUp from "../common/Buttons/SignUp";
import MembershipPrompt from "../common/profile/MembershipPrompt";

interface PostMenuProps {
  icon?: As;
  label: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const accessLevelTest = function (accesslevel_id: number) {
  if (accesslevel_id == 1) {
    return "Everyone";
  }
  if (accesslevel_id == 2) {
    return "Gold";
  }
  if (accesslevel_id == 3) {
    return "VIP";
  }
};

const PostMenu: FunctionComponent<PostMenuProps> = ({
  icon,
  label,
  onClick,
}) => (
  <MenuItem py="10px" aria-label={label} onClick={onClick}>
    <Box as={icon} size="16px" mr="8px" />
    <Text>{label}</Text>
  </MenuItem>
);

interface PostProps {
  post: IPost;
  likePostIds?: number[];
  handleChangeLikePostIds?: (val: number[]) => void;
  onDeletePostCallback?: () => void;
  customFooter?: JSX.Element;
}

const handleDownloadPost = async (postId: number) => {
  try {
    const res = await apiClient.get(`/post/download/${postId}`);
    const { data } = res;
    if (data.result) {
      const { result } = data;
      setTimeout(() => {
        window.open(result, "_blank");
      }, 100);
    }
  } catch (error) {
    console.log(error);
  }
};

const DJ_APP_POST_URL = import.meta.env.VITE_DJFAN_DJ_URL + "/create";

const Post: FunctionComponent<PostProps> = ({
  post,
  likePostIds,
  handleChangeLikePostIds,
  onDeletePostCallback,
  customFooter,
}) => {
  const { data: user } = useUser();
  const isUserLoggedIn = !!user?.user_id;
  const { username } = useParams<{ username: string }>();
  const { data: profile } = useProfile(username as string);
  const navigate = useNavigate();
  const isPostAuthor = post.profile_url === user?.username?.toLowerCase();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMembership, setShowMembership] = useState(false);
  const [accesslevel, setAccesslevel] = useState(0 as number);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isLiked = useMemo(() => {
    if (!likePostIds) return false;
    return likePostIds.includes(post.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likePostIds]);

  const handleClick = async () => {
    const res = await updatePostState(post.id);
    if (res) {
      if (res.liked) {
        if (!isLiked) {
          handleChangeLikePostIds &&
            handleChangeLikePostIds([...(likePostIds || []), post.id]);
        }
      } else {
        if (isLiked) {
          handleChangeLikePostIds &&
            handleChangeLikePostIds(
              (likePostIds || []).filter((likePost) => likePost !== post.id)
            );
        }
      }
    }
  };

  const share = function (
    params = { image: "", title: "", text: "", url: "" }
  ) {
    if (navigator.share) {
      let metaImage = document.querySelector('meta[property="og:image"]');
      if (metaImage == null) {
        metaImage = document.createElement("meta");
        metaImage["property"] = "og:image";
        metaImage["content"] = params.image;
        const head = document.querySelector("head") || null;
        if (head != null) {
          head.insertAdjacentElement("beforeend", metaImage);
        }
      } else {
        metaImage.setAttribute("content", params.image);
      }

      navigator
        .share({
          title: params.title,
          text: params.text,
          url: params.url,
        })
        .then(() => console.log())
        .catch((error) => console.log(error));
    }
  };

  const handleDeletePost = async () => {
    if (!selectedPost?.id) return;
    try {
      setIsDeleting(true);
      await deletePost(selectedPost?.id);
      setIsDeleting(false);
      await onDeletePostCallback?.();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (post?.posttype_id === PostVariant.Audio) {
    if (post.audio[0] !== undefined) {
      post.audio[0].author = post.display_name as string;
    }
  }

  return (
    <>
      {isModalOpen && (
        <MembershipPrompt accesslevel={accesslevel} onClose={closeModal} />
      )}

      <Card border="2px solid black" borderRadius="15px" width="100%">
        <CardHeader borderBottom="2px solid black" zIndex="1">
          <Flex gap={4}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={post?.display_name || profile?.display_name}
                border="1px solid cyan"
                src={post?.profile_picture || profile?.profile_picture}
              >
                <AvatarBadge
                  bg="green.500"
                  boxSize="1.25rem"
                  borderColor="white"
                  display="block"
                  justifyContent="flex-end"
                />
              </Avatar>
              <Box>
                <Link
                  pb="2px"
                  size="sm"
                  fontWeight="700"
                  as={RouterLink}
                  to={`/artists/${post?.profile_url ?? profile?.profile_url}`}
                >
                  {post?.display_name ||
                    (profile?.display_name && profile.display_name)}
                </Link>
                <HStack>
                  <Text fontSize="12px" color="gray.500" fontWeight="500">
                    {/* 
                  {post?.page != "home" &&
                    post?.created_at &&
                    timeAgo(post.created_at)}
                    */}
                  </Text>
                  <Flex align="center" gap="4px">
                    <Box as={FiEye} size="14px" color="#805ad5" />
                    <Text fontSize="14px" color="#805ad5" fontWeight="600">
                      {post?.accesslevel_id &&
                        accessLevelTest(post.accesslevel_id)}
                    </Text>
                  </Flex>
                </HStack>
              </Box>
            </Flex>
            {isPostAuthor && (
              <Menu>
                <MenuButton
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
                  <PostMenu
                    icon={BiEdit}
                    label="Edit Post"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(DJ_APP_POST_URL, "_blank");
                    }}
                  />
                  <PostMenu
                    icon={BiTrash}
                    label="Delete Post"
                    onClick={(e: MouseEvent<HTMLElement>) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                      onOpen();
                    }}
                  />
                  {/* <PostMenu icon={FiShare} label="Share Post" /> */}
                </MenuList>
              </Menu>
            )}
          </Flex>
        </CardHeader>
        {/* has_access */}
        <CardBody p="0" minHeight="80px">
          {/*
        {post.posttype_id === PostVariant.Text && <>Text-Post</>}
        {post.posttype_id === PostVariant.Video && <>Video-Post</>}
        {post.posttype_id === PostVariant.Images && <>Image-Post</>}
        {post.posttype_id === PostVariant.Audio && <>Audio-Post</>}
         */}

          {post.posttype_id === PostVariant.Text && (
            <>
              {post.has_access === false && post?.page != "home" && (
                <Box style={{ position: "relative" }}>
                  <Box style={{ position: "relative" }}>
                    <Box
                      onClick={() => {
                        setAccesslevel(post.accesslevel_id);
                        setIsModalOpen(true);
                      }}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        zIndex: "5",
                      }}
                    >
                      <Box
                        fontWeight="600"
                        fontSize="16px"
                        lineHeight="1em"
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                          padding: "7px",
                          display: "flex",
                        }}
                      >
                        <BiSolidLock />
                        <Text as="span" style={{ paddingLeft: "6px" }}>
                          Locked
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              {(post.has_access === true || post?.page == "home") && (
                <Box>
                  <TextContent text={post.body} />
                </Box>
              )}
              {post.has_access === false && post?.page != "home" && (
                <Box
                  onClick={() => {
                    setAccesslevel(post.accesslevel_id);
                    setIsModalOpen(true);
                  }}
                >
                  <TextContent text="******************************" />
                </Box>
              )}
            </>
          )}

          {post.posttype_id === PostVariant.Images && (
            <>
              <Box>
                <Box>
                  {post.has_access === false && post?.page != "home" && (
                    <Box style={{ position: "relative" }}>
                      <Box
                        onClick={() => {
                          setAccesslevel(post.accesslevel_id);
                          setIsModalOpen(true);
                        }}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          cursor: "pointer",
                          zIndex: "5",
                        }}
                      >
                        <Box
                          fontWeight="600"
                          fontSize="16px"
                          lineHeight="1em"
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            padding: "7px",
                            display: "flex",
                          }}
                        >
                          <BiSolidLock />
                          <Text as="span" style={{ paddingLeft: "6px" }}>
                            Locked
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {(post.has_access === true || post?.page == "home") && (
                    <Box
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ImagesContent images={post.image} />
                    </Box>
                  )}

                  {post.has_access === false && post?.page != "home" && (
                    <Box
                      onClick={() => {
                        setAccesslevel(post.accesslevel_id);
                        setIsModalOpen(true);
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <ImagesContent images={post.image} />
                    </Box>
                  )}
                </Box>

                {post.body ? <TextContent text={post.body} /> : null}
              </Box>
            </>
          )}

          {post.posttype_id === PostVariant.Audio && (
            <>
              {/*
              {(post.has_access === true || post?.page == "home") && (
                <AudioContent audios={post.audio} hasaccess={post.has_access} accesslevel={post.accesslevel_id} />
              )}
              */}
              {post.has_access === false && post?.page != "home" && (
                <Box style={{ position: "relative" }}>
                  <Box
                    onClick={() => {
                      setAccesslevel(post.accesslevel_id);
                      setIsModalOpen(true);
                    }}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                      zIndex: "5",
                    }}
                  >
                    <Box
                      fontWeight="600"
                      fontSize="16px"
                      lineHeight="1em"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        padding: "7px",
                        display: "flex",
                      }}
                    >
                      <BiSolidLock />
                      <Text as="span" style={{ paddingLeft: "6px" }}>
                        Locked
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}
              {post?.audio[0].embedded == false && (
                <AudioContent
                  audios={post.audio}
                  hasaccess={post.has_access}
                  accesslevel={post.accesslevel_id}
                />
              )}
              {post.has_access == true && post?.audio[0].embedded == true && (
                <AudioContent
                  audios={post.audio}
                  hasaccess={post.has_access}
                  accesslevel={post.accesslevel_id}
                />
              )}
              {post.has_access == false && post?.audio[0].embedded == true && (
                <Box
                  style={{
                    width: "100%",
                    minHeight: "160px",
                    backgroundColor: "#fbeeff",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Center style={{ fontSize: "1.2em" }}>
                    <Text as="span" style={{ paddingLeft: "6px" }}>
                      <FiHeadphones /> Embedded audio
                    </Text>
                  </Center>
                </Box>
              )}
              {post.body ? <TextContent text={post.body} /> : null}
            </>
          )}
          {post.posttype_id === PostVariant.Video && (
            <>
              {(post.has_access === true || post?.page == "home") && (
                <VideoContent videos={post.video} />
              )}

              {post.has_access === false && post?.page != "home" && (
                <Box style={{ position: "relative" }}>
                  <Box style={{ position: "relative" }}>
                    <Box
                      onClick={() => {
                        setAccesslevel(post.accesslevel_id);
                        setIsModalOpen(true);
                      }}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        zIndex: "5",
                      }}
                    >
                      <Box
                        fontWeight="600"
                        fontSize="16px"
                        lineHeight="1em"
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                          padding: "7px",
                          display: "flex",
                        }}
                      >
                        <BiSolidLock />
                        <Text as="span" style={{ paddingLeft: "6px" }}>
                          Locked
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}

              {post.has_access === false && post?.page != "home" && (
                <Box
                  bgImage={post.video[0].poster}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "200px",
                    maxHeight: "500px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                    display: "flex",
                    backgroundColor: "#fbeeff",
                  }}
                  onClick={() => {
                    setAccesslevel(post.accesslevel_id);
                    setIsModalOpen(true);
                  }}
                >
                  <Center style={{ height: "100%", width: "100%" }}>
                    <Box
                      position={"relative"}
                      style={{ minHeight: "200px", maxHeight: "500px" }}
                    >
                      <Box
                        position={"absolute"}
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      >
                        <Box
                          borderRadius="100px"
                          bg="#fff"
                          zIndex={"1"}
                          top="30px"
                        >
                          <FaCirclePlay
                            {...iconStyles}
                            onClick={() => {
                              setAccesslevel(post.accesslevel_id);
                              setIsModalOpen(true);
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Center>
                </Box>
              )}
              <Box>{post.body ? <TextContent text={post.body} /> : null}</Box>
            </>
          )}
        </CardBody>

        {/*                
      {isUserLoggedIn && (
        <>
          <CardFooter
            display="flex"
            justify-content="space-between"
            px="0"
            py="5px"
            borderTop={`${post.has_access === true && isUserLoggedIn && post?.page != "home" && "2px solid #000"}`}
            alignItems="center"
          >
            <Link paddingLeft={4} fontSize={16} fontWeight="600" lineHeight="1em" textDecoration="underline" onClick={() => {}}>
              View Comments
            </Link>
          </CardFooter>
        </>
      )}
      */}

        {/* 
      {isUserLoggedIn &&
        (customFooter || (
          <CardFooter      
      */}

        {isUserLoggedIn &&
          post.has_access &&
          (customFooter || (
            <CardFooter
              zIndex="1"
              display="flex"
              justify-content="space-between"
              px="0"
              py="5px"
              borderTop={`${
                post.has_access === true &&
                isUserLoggedIn &&
                post?.page != "home" &&
                "2px solid #000"
              }`}
              alignItems="center"
            >
              {/*
          <Link
            paddingLeft={4}
            fontSize={16}
            fontWeight="600"
            lineHeight="1em"
            as={RouterLink}
            to={`/artists/${post?.profile_url ?? profile?.profile_url}`}
          >
            @
            {post?.display_name ||
              (profile?.display_name && profile.display_name)}
          </Link>
            */}

              {/* 
            <Link
              paddingLeft={4}
              fontSize={16}
              fontWeight="600"
              lineHeight="1em"
              textDecoration="underline"
              onClick={() => {
                if (post.has_access) {
                  navigate(`/artists/${post?.profile_url ?? profile?.profile_url}/post/${post.id}`);
                }
              }}
            >
              View Comments
            </Link>
            */}

              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  paddingRight: "10px",
                  flexWrap: "nowrap",
                }}
              >
                <div style={{ padding: "4px", cursor: "pointer" }}>
                  {post.has_access === true &&
                    isUserLoggedIn &&
                    post?.page != "home" && (
                      <>
                        {isLiked ? (
                          <AiFillHeart
                            color="#DC143C"
                            size={25}
                            onClick={handleClick}
                          />
                        ) : (
                          <AiOutlineHeart size={25} onClick={handleClick} />
                        )}
                      </>
                    )}
                </div>

                {post.posttype_id === PostVariant.Audio && post.has_access && (
                  <div style={{ padding: "4px", cursor: "pointer" }}>
                    <FiDownload
                      size={26}
                      onClick={() => handleDownloadPost(post.id)}
                    />
                  </div>
                )}

                {typeof navigator.share == "function" && (
                  <div style={{ padding: "4px", cursor: "pointer" }}>
                    <FiShare
                      size={26}
                      onClick={() => {
                        share({
                          image: `${
                            post?.profile_picture || profile?.profile_picture
                          }`,
                          title: `${
                            post?.display_name ||
                            (profile?.display_name && profile.display_name)
                          }  | Discover exclusive DJ content only on DJfan`,
                          text: `Discover more of ${
                            post?.display_name ||
                            (profile?.display_name && profile.display_name)
                          }. Access tracks, playlists, videos, & exclusive releases. Members also get VIP invites, pre-release tickets, discounts, community chat & more.`,
                          url: `https://djfan.app/artists/${
                            post?.profile_url ?? profile?.profile_url
                          }`,
                        });
                      }}
                    />
                  </div>
                )}
              </div>
            </CardFooter>
          ))}

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Post
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={async () => {
                    await handleDeletePost();
                    onClose();
                  }}
                  ml={3}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Card>
    </>
  );
};

export default Post;

const iconStyles = {
  fontSize: "60px",
  cursor: "pointer",
  color: "cyan",
  _hover: { color: "cyan" },
  _active: { transform: "scale(0.95)" },
};
