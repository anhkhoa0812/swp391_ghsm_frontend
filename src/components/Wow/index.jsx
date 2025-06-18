import { useEffect } from "react";
import WOW from "wowjs";

const WowProvider = ({ children }) => {
  useEffect(() => {
    // Sử dụng WOW.WOW thay vì WOW trực tiếp
    const wow = new WOW.WOW({ live: false });
    wow.init();
  }, []);

  return <>{children}</>;
};

export default WowProvider;
