import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLOgout: () => void;
  handleLogoutRequst: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  useEffect(() => {
    AOS.init({ duration: 1400 }); // You can adjust the animation duration or other options
  }, []);
  const {
    cartItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLOgout,
    handleLogoutRequst,
  } = props;

  const { authMember } = useGlobals();

  // HANDLERS

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img
                className="brand-logo"
                style={{ height: "200%", width: "200%" }}
                src="/icons/Logo.svg"
              />
            </NavLink>
          </Box>
          <Stack
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="100"
            data-aos-offset="0"
            className="links"
          >
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName={"underline"}>
                Home
              </NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName={"underline"}>
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName={"underline"}>
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  data-aos="flip-left"
                  className="login-button"
                  style={{
                    backgroundColor: "#46A358",
                    color: "#fff",
                    borderRadius: "46px",
                    fontFamily: "Cera Pro",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
              />
            )}

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLOgout}
              onClick={handleCloseLOgout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequst}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box data-aos="zoom-in" className="head-mini-text">
              Welcome to GreenShop
            </Box>
            <Box
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="head-main-text"
            >
              Let’s Make a Better {"  "}
              <span className="head-main-text-span">Planet</span>
            </Box>
            <Box
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
              className="wel-txt"
            >
              We are an online plant shop offering a wide range of cheap and
              trendy plants. Use our plants to create an unique Urban Jungle.
              Order your favorite plants!
            </Box>
            <Box className="signup">
              {!authMember ? (
                <Button
                  variant="contained"
                  data-aos="flip-right"
                  className="signup-button"
                  style={{
                    backgroundColor: "#46A358",
                    color: "#fff",
                    borderRadius: "46px",
                    fontFamily: "Cera Pro",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}
                  onClick={() => setSignupOpen(true)}
                >
                  {" "}
                  SIGN UP
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className={"logo-frame"}>
            <div className="logo-img">
              <div className="logo-img-mini"></div>
            </div>
            <div className="logo-img-mini"></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
