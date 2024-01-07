import Table from "@/components/Table";
import React, { useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { useRouter } from 'next/router';
import useAuthen from './api/authHook.js'; // Make sure this is actually a hook

export default function Dashboard() { // Component names must start with an uppercase letter
  const backgroundStyle = {
    backgroundImage: `url('background.png')`,
    backgroundSize: "1280px 832px",
    backgroundRepeat: "repeat",
    width: "100%", // Set the width you need for your element
    height: "100vh", // Set the height you need for your element
  };

  const { user, loading } = useAuthen();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div style={backgroundStyle}>
      <div className="container dashboard">
        <h1 className="my-5">
          Welcome <span className="text">Admin</span>
        </h1>
        <Table />
        <ConfirmModal />
      </div>
    </div>
  );
}
