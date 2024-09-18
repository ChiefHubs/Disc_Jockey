import { FunctionComponent } from "react";
import AuthLayout from "../components/layouts/AuthLayout";

interface ExternalNavigateProps {
  to: string;
}

const ExternalNavigate: FunctionComponent<ExternalNavigateProps> = ({ to }) => {
  to;
  return <AuthLayout />;
};

export default ExternalNavigate;
