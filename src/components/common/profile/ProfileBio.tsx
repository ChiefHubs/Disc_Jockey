import {
  Flex,
  Text,
  Card,
  Heading,
  Button,
  ButtonGroup,
  Stack,
  HStack,
  // IconButton,
  Box,
  CircularProgress,
  Link,
} from "@chakra-ui/react";
import {
  // FaFacebookF,
  // FaTwitter,
  // FaInstagram,
  // FaSoundcloud,
  // FaMixcloud,
  // FaSpotify,
  FaEnvelope,
  FaHeadphones,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";

export default function ProfileBiography() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, error, isLoading } = useProfile(username as string);

  return (
    <Flex w="100%" flexDirection="column" justifyContent="center" align="center" p="0px" gap="20px" pb="50px">
      <Card w={{ base: "100%", md: "500px" }} style={{ backgroundColor: "#000", color: "#FFF" }} p="30px" border="2px solid cyan">
        <Heading fontSize="28px" pb="15px">
          About
        </Heading>
        {error ? null : isLoading ? (
          <Box height="5rem" display="flex" justifyContent="center" p={2}>
            <CircularProgress isIndeterminate />
          </Box>
        ) : (
          <>
            <Text
              dangerouslySetInnerHTML={{
                __html: profile ? profile.about_me : "",
              }}
              lineHeight="1.5em"
            ></Text>

            {(() => {
              if (profile) {
                return (
                  <Stack spacing="0px" pt="15px">
                    {(() => {
                      if (profile.website) {
                        return (
                          <HStack spacing="5px">
                            <Text fontSize="16px" color="#805ad5" fontWeight="600">
                              WEBSITE:
                            </Text>
                            <Link display="flex" href={profile.website} fontWeight="600" alignItems="center" gap="5px" target="_blank">
                              Open Link <FaExternalLinkAlt fontSize="14px" />
                            </Link>
                          </HStack>
                        );
                      }
                    })()}
                    {(() => {
                      if (profile.location) {
                        return (
                          <HStack spacing="5px">
                            <Text fontSize="16px" color="#805ad5" fontWeight="600">
                              LOCATION:
                            </Text>
                            <Text>
                              <a href={profile.location} target="_new">
                                {profile.location}
                              </a>
                            </Text>
                          </HStack>
                        );
                      }
                    })()}
                    {(() => {
                      if (profile.country) {
                        return (
                          <HStack spacing="5px">
                            <Text fontSize="16px" color="#805ad5" fontWeight="600">
                              COUNTRY:
                            </Text>
                            <Text>
                              <a href={profile.country} target="_new">
                                {profile.country}
                              </a>
                            </Text>
                          </HStack>
                        );
                      }
                    })()}
                  </Stack>
                );
              }
            })()}

            {(() => {
              if (profile?.management || profile?.bookings) {
                return (
                  <HStack spacing="5px" pt="15px">
                    <ButtonGroup gap="4">
                      {(() => {
                        if (profile.management) {
                          return (
                            <Button
                              leftIcon={<FaEnvelope />}
                              colorScheme="purple"
                              onClick={() => {
                                open(profile.management.toString().indexOf("@") > 0 ? "mailto:" + profile.management : profile.management);
                              }}
                            >
                              Management
                            </Button>
                          );
                        }
                      })()}
                      {(() => {
                        if (profile.bookings) {
                          return (
                            <Button
                              leftIcon={<FaHeadphones />}
                              colorScheme="green"
                              onClick={() => {
                                open(profile.bookings.toString().indexOf("@") > 0 ? "mailto:" + profile.bookings : profile.bookings);
                              }}
                            >
                              Bookings
                            </Button>
                          );
                        }
                      })()}
                    </ButtonGroup>
                  </HStack>
                );
              }
            })()}

            {/* DJFAN-529 hide all socials on the pres kit page (biography)
            reason for now we don't want fan to click away to an instagram profile for example */}
            {/* {(() => {
              if (profile) {
                return (
                  <HStack spacing="5px" pt="15px">
                    {(() => {
                      if (profile.facebook) {
                        return (
                          <IconButton
                            fontSize="22px"
                            variant="ghost"
                            aria-label="Facebook"
                            icon={<FaFacebookF />}
                            onClick={() => {
                              open(
                                profile.facebook
                                  .toString()
                                  .indexOf("facebook.com") > 0
                                  ? profile.facebook
                                  : "https://facebook.com/" + profile.facebook
                              );
                            }}
                          />
                        );
                      }
                    })()}

                    {(() => {
                      if (profile.twitter) {
                        return (
                          <IconButton
                            fontSize="22px"
                            variant="ghost"
                            aria-label="Twitter"
                            icon={<FaTwitter />}
                            onClick={() => {
                              open(
                                profile.instagram
                                  .toString()
                                  .indexOf("twitter.com") > 0
                                  ? profile.twitter
                                  : "https://twitter.com/" + profile.twitter
                              );
                            }}
                          />
                        );
                      }
                    })()}

                    {(() => {
                      if (profile.instagram) {
                        return (
                          <>
                            {}
                            <IconButton
                              fontSize="22px"
                              variant="ghost"
                              aria-label="Instagram"
                              icon={<FaInstagram />}
                              onClick={() => {
                                open(
                                  profile.instagram
                                    .toString()
                                    .indexOf("instagram.com") > 0
                                    ? profile.instagram
                                    : "https://instagram.com/" +
                                        profile.instagram
                                );
                              }}
                            />
                          </>
                        );
                      }
                    })()}

                    {(() => {
                      if (profile.spotify) {
                        return (
                          <IconButton
                            fontSize="22px"
                            variant="ghost"
                            aria-label="Spotify"
                            icon={<FaSpotify />}
                            onClick={() => {
                              open(
                                profile.spotify
                                  .toString()
                                  .indexOf("spotify.com") > 0
                                  ? profile.spotify
                                  : "https://spotify.com/" + profile.spotify
                              );
                            }}
                          />
                        );
                      }
                    })()}

                    {(() => {
                      if (profile.mixcloud) {
                        return (
                          <IconButton
                            fontSize="22px"
                            variant="ghost"
                            aria-label="Mixcloud"
                            icon={<FaMixcloud />}
                            onClick={() => {
                              open(
                                profile.mixcloud
                                  .toString()
                                  .indexOf("mixcloud.com") > 0
                                  ? profile.mixcloud
                                  : "https://mixcloud.com/" + profile.mixcloud
                              );
                            }}
                          />
                        );
                      }
                    })()}

                    {(() => {
                      if (profile.soundcloud) {
                        return (
                          <IconButton
                            fontSize="22px"
                            variant="ghost"
                            aria-label="Soundcloud"
                            icon={<FaSoundcloud />}
                            onClick={() => {
                              open(
                                profile.soundcloud
                                  .toString()
                                  .indexOf("soundcloud.com") > 0
                                  ? profile.soundcloud
                                  : "https://soundcloud.com/" +
                                      profile.soundcloud
                              );
                            }}
                          />
                        );
                      }
                    })()}
                  </HStack>
                );
              }
            })()} */}
          </>
        )}
      </Card>
    </Flex>
  );
}
