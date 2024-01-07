import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className="container d-flex justify-content-around">
        <LoginForm></LoginForm>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </>
  )
}
