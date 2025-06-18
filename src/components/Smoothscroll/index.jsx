import { useEffect } from "react";

const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      const isTrackpad = Math.abs(event.deltaY) < 15; // Giá trị nhỏ hơn -> trackpad
      const speedFactor = isTrackpad ? 2000 : 8; // Tăng tốc độ cho trackpad

      window.scrollBy({
        top: event.deltaY * speedFactor,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return <div>{children}</div>;
};

export default SmoothScrollWrapper;
