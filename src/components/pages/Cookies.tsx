import { Flex, Box, Heading, Text, VStack, Stack } from "@chakra-ui/react";

export default function Cookies() {
  return (
    <Box w="100%" display="flex" flexDirection="column">
      <Flex justifyContent="center">
        <Flex
          maxW={{ base: "100%", md: "900px" }}
          flexDirection="column"
          gap="25px"
          py="30px"
          mx="15px"
          lineHeight="1.5em"
        >
          <VStack align="flex-start" fontSize="16px" gap="35px">
            <Stack>
              <Heading as="h1" fontSize="24px">
                Cookie Policy
              </Heading>
              <Text>
                A cookie is a small text file that a website saves on your
                computer or mobile device when you visit the site. This small
                text file enables a site to remember your actions and
                preferences for a specified period of time so you don’t have to
                re-enter your login or settings information each time you visit
                a new page on our site.
              </Text>
            </Stack>
            <Stack>
              <Heading as="h2" fontSize="18px">
                Use on DJfan
              </Heading>

              <Text>
                To summarize: DJfan uses cookies and other tracking technologies
                to provide our service. Cookies are not strictly necessary for
                the website to work, but they provide you with a better browsing
                experience. If you choose to delete or block these cookies, some
                features of this site may not work as intended.
              </Text>

              <Text>
                Cookies are not used to identify you personally and are not used
                for any purpose other than those described here.
              </Text>
            </Stack>
            <Stack>
              <Heading as="h3" fontSize="18px">
                Security / Authentication:
              </Heading>
              <Text>
                Some cookie and similar technology functions are necessary and
                vital to ensuring that DJfan works properly for visitors and
                members, such as maintaining the security, safety, and integrity
                on DJfan, authentication and logging in (including remembering
                permissions and consents you have granted), and ensuring the
                ability to securely complete transactions.
              </Text>
            </Stack>
            <Stack>
              <Heading as="h3" fontSize="18px">
                Performance / Analytics and Research:
              </Heading>
              <Text>
                Some technologies help provide performance data on how DJfan is
                functioning in order to make improvements to the platform. Data
                collected on-site and app functionality and speed, on how DJfan
                is used and for detecting and gathering reporting on bugs helps
                improve DJfan and the services we offer.
              </Text>
            </Stack>
            <Stack>
              <Heading as="h3" fontSize="18px">
                Preferences / Localisation:
              </Heading>
              <Text>
                Cookies enable your personalized views and settings. Some
                cookies help us provide localized experiences &ndash; for
                example, by making sure you see DJfan in your preferred
                language.
              </Text>
            </Stack>
            <Stack>
              <Heading as="h3" fontSize="18px">
                Social Networks / Marketing:
              </Heading>
              <Text>
                Some technologies help you to interact with social networks you
                are signed into while using DJfan, such as logging in with the
                social network and other features you employ with the social
                network, or that are allowed in the social network&rsquo;s
                privacy policy. These may be set and controlled by the social
                networks, and your preferences with those social networks.
              </Text>
            </Stack>
          </VStack>
          <Stack>
            <Heading as="h3" fontSize="18px">
              &ldquo;Do-not-track&rdquo; technologies
            </Heading>
            <Text>
              We do not respond to web browser &ldquo;Do-Not-Track&rdquo;
              signals.
            </Text>
          </Stack>
          <Stack>
            <Heading as="h3" fontSize="18px">
              How to manage cookies
            </Heading>
            <Text>
              You can control the use of cookies at the individual browser
              level. If you reject or delete cookies, our services may no longer
              function as intended. Each browser provides different mechanisms
              for managing cookies. Look at your browser&rsquo;s help menu to
              determine the best way to modify your browser&rsquo;s cookie
              storage.
            </Text>
          </Stack>
          <Stack>
            <Heading as="h3" fontSize="18px">
              Changes to Cookie Policy
            </Heading>
            <Text>
              We periodically update this Cookie Policy to account for changed
              legal and operational circumstances, to describe new cookies and
              tracking technologies, and to describe how those changes affect
              our use of your information. If we are going to use information in
              a manner that is materially different from that stated at the time
              of collection or make any material changes to our privacy
              practices, we will notify you. We will post those changes through
              a prominent notice on our website.
            </Text>
            <Text>
              This policy is part of DJfan&rsquo;s{" "}
              <a
                href="https://djfan.app/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>terms of use</b>
              </a>{" "}
              and{" "}
              <a
                href="https://djfan.app/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>Privacy Policy</b>
              </a>
              . For more information, contact DJfan at{" "}
              <a href="mailto:support@djfan.app" target="_self">
                support@djfan.app
              </a>
              .
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
