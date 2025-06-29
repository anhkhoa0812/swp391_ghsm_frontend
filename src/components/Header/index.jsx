/* eslint-disable no-unused-vars */
import logo from "../../assets/images/logo/logo.png";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LoginSignin from "../../modules/HomeTemplate/LoginSignin";
import { Avatar } from "antd";
import avatar from "../../assets/PregnantAvatar.jpg";
import { useNavigate } from "react-router-dom";
import DrawerMenu from "../DrawerMenu";
import { motion } from "framer-motion";

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 10 },
  },
};

const Headers = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_TOKEN");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    setUser(null);
    setDrawerOpen(false);
    navigate("/");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setOpen(false); // Close the modal
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`header--sticky ${isSticky ? "sticky" : ""}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container-full-header">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-wrapper-1">
              <div className="logo-area-start">
                <motion.a
                  onClick={() => navigate("/")}
                  className="logo"
                  whileHover={{ scale: 1.1 }}
                  style={{ display: "inline-block" }}
                >
                  <img src={logo} alt="HealthWise logo" />
                </motion.a>
                <div className="nav-area">
                  <ul>
                    <motion.li
                      className="main-nav"
                      whileHover={{ scale: 1.05 }}
                      style={{ display: "inline-block", marginRight: 20 }}
                    >
                      <a onClick={() => navigate("/")}>Home</a>
                    </motion.li>
                    <motion.li
                      className="main-nav"
                      whileHover={{ scale: 1.05 }}
                      style={{ display: "inline-block", marginRight: 20 }}
                    >
                      <a onClick={() => navigate("/blog")}>Blog</a>
                    </motion.li>
                    <motion.li
                      className="main-nav"
                      whileHover={{ scale: 1.05 }}
                      style={{ display: "inline-block", marginRight: 20 }}
                    >
                      <a onClick={() => navigate("/stis-testing-services")}>
                        STIs & Testing Services
                      </a>
                    </motion.li>
                    <motion.li
                      className="main-nav"
                      whileHover={{ scale: 1.05 }}
                      style={{ display: "inline-block", marginRight: 20 }}
                    >
                      <a onClick={() => navigate("/Booking")}>
                        Consultation & Booking
                      </a>
                    </motion.li>
                    <motion.li
                      className="main-nav"
                      whileHover={{ scale: 1.05 }}
                      style={{ display: "inline-block", marginRight: 20 }}
                    >
                      <a onClick={() => navigate("/ovulation")}>
                        Cycle Tracking
                      </a>
                    </motion.li>
                  </ul>
                </div>
              </div>
              <div className="header-right">
                <div className="input-area">
                  <input id="myInput" type="text" placeholder="Search..." />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="search-icon"
                  />
                </div>

                {user ? (
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Avatar
                      src={user.avatar || avatar}
                      size={40}
                      style={{ cursor: "pointer" }}
                      onClick={handleOpenDrawer}
                    />
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={handleOpen}
                    className="rts-btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                  >
                    Login/Sign up
                  </motion.button>
                )}

                <LoginSignin
                  open={open}
                  onClose={handleClose}
                  onLoginSuccess={handleLoginSuccess}
                />

                <DrawerMenu
                  drawerOpen={drawerOpen}
                  handleCloseDrawer={handleCloseDrawer}
                  user={user}
                  url={user?.avatar || avatar}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Headers;