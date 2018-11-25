import React from "react";

// Error component, renders error if the profile doesnt exist
const Error = () => {
  const style = {
    textAlign: "center",
    margin: "10px auto",
    background: "lightblue",
    height: "30px",
    width: "300px"
  };
  return <div style={style}>User doesn't exist</div>;
};

export default Error;
