import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        <Header />
        {/* <main className="d-flex bg-[url('https://img.freepik.com/free-vector/abstract-natural-botanical-sketch-seamless-pattern_1284-50319.jpg')]"> */}
        <main className="flex-grow bg-orange-100 relative ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
