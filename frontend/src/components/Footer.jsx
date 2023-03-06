import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";

/**
 * @desc Creates a Footer Component if the user is logged in
 */
const Footer = () => {
  const { loggedIn } = useAuthStatus();

  if (!loggedIn) return <div className="footer-container"></div>;
};

export default Footer;
