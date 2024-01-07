import Table from "@/components/Table";
import React from "react";
import ConfirmModal from "@/components/ConfirmModal";

export default function dashboard() {
  const backgroundStyle = {
    backgroundImage: `url('background.png')`,
    backgroundSize: "1280px 832px",
    backgroundRepeat: "repeat",
    width: "100%", // Set the width you need for your element
    height: "100vh", // Set the height you need for your element
    // Optional: If you want to rotate the container to give a diagonal effect
  };
  return (
    <div style={backgroundStyle}>
      <div className="container dashboard">
        <h1 className="my-5">
          Welcome <span className="text">$Name</span>
        </h1>
        <Table></Table>
        <ConfirmModal></ConfirmModal>
      </div>
    </div>
  );
}
