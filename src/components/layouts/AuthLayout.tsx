import { Flex } from "@chakra-ui/react";
import Hero from "../common/Home/Sections/Hero";
import Features from "../common/Home/Sections/Features";
import Posts from "../common/Home/Sections/Posts";
import FeatureCards from "../common/Home/Sections/FeatureCards";
import CTA from "../common/Home/Sections/CTA";
import { FunctionComponent } from "react";

interface AuthLayoutProps {}

const AuthLayout: FunctionComponent<AuthLayoutProps> = () => {
  return (
    <Flex flexDirection="column">
      <Hero />
      <FeatureCards />
      <CTA />
      <Posts />
      <Features />
    </Flex>
  );
};

export default AuthLayout;
