import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import DisplayData from "../components/DisplayData";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="container pt-5 d-flex justify-content-around">
        <h1>Auth from Discord</h1>
        <Link href="/dashboard" className="btn btn-primary btn-lg">
          Sign in (Routes){" "}
        </Link>
        <DisplayData />
      </div>
    </>
  );
}
