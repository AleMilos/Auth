import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
const Footer = () => {
  const { loggedIn } = useAuthStatus();

  if (!loggedIn) return <div className="footer-container"></div>;
};

export default Footer;
