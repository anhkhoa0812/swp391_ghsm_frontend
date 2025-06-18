import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function HomePages() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
