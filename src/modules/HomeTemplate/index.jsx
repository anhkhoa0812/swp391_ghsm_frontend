import Aboutus from "./About";
import Booking from "./Booking";
import Carousel from "./Carousel";

import ShortServices from "./ShortServices";
import Testimonials from "./Testimonials";
import WhyChoose from "./Whychoose";
import WowProvider from "../../components/Wow";
export default function HomeTemplate() {
  return (
    <>
      <WowProvider>
        <Carousel />
        <ShortServices />
        <Aboutus />
        <WhyChoose />
        <Testimonials />
        <Booking />
      </WowProvider>
    </>
  );
}
