import Table from "@/components/Table";
import React, {useEffect} from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { useRouter } from 'next/router';
import useAuth from './api/authHook.js';

export default function dashboard() {
  const backgroundStyle = {
    backgroundImage: `url('background.png')`,
    backgroundSize: "1280px 832px",
    backgroundRepeat: "repeat",
    width: "100%", // Set the width you need for your element
    height: "100vh", // Set the height you need for your element
    // Optional: If you want to rotate the container to give a diagonal effect
  };
  const { user, loading } = useAuth();
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
        <Table></Table>
        <ConfirmModal></ConfirmModal>
      </div>
    </div>
  );
}

