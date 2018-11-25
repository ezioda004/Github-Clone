import React from "react";

const Footer = () => {
  const style = {
    background: "#24292e",
    color: "white",
    position: "fixed",
    bottom: "0",
    width: "100%",
    textAlign: "center",
    height: "30px",
  };
  const anchorStyle = {
    color: "white",
    textDecoration: "none"
  };
  return (
    <footer style={style}>
      Made by{" "}
      <a href="https://github.com/ezioda004" style={anchorStyle}>
        ezioda004
      </a>
    </footer>
  );
};

export default Footer;
