import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #343434;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers style={{ background: "#fbfbfb" }}>
      <Container>
        <Stack className="big-footer-box">
          <Stack display={"flex"} flexDirection={"row"} className="top-big-box">
            <Box className={"top-big-left-box"}>
              <img src="/img/first.png" alt="" />
              <p>Garden Care</p>
              <span>
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </span>
            </Box>
            <Box className={"top-big-left-box"}>
              <img src="/img/second.png" alt="" />
              <p>Garden Care</p>
              <span>
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </span>
            </Box>
            <Box className={"top-big-left-box"}>
              <img src="/img/third.png" alt="" />
              <p>Garden Care</p>
              <span>
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </span>
            </Box>
            <Box className={"top-big-right-box"}>
              <p>Would you like to join newsletters?</p>
              <form className="email-form">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="email-input"
                  required
                />
                <button type="submit" className="join-btn">
                  Join
                </button>
              </form>
              <span>
                We usually post offers and challenges in newsletter. We’re your
                online houseplant destination. We offer a wide range of
                houseplants and accessories shipped directly from our
                (green)house to yours!{" "}
              </span>
            </Box>
          </Stack>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            className="middle-big-box"
          >
            <Box className={"middle-box-logo"}>
              <img src="/icons/Logo.svg" alt="" />
            </Box>
            <Box className={"middle-box"}>
              <LocationOnIcon style={{ width: "20px", height: "20px" }} />
              <p>70 West Buckingham Ave. Farmingdale, NY 11735</p>
            </Box>
            <Box ml={"20px"} className={"middle-box"}>
              <MessageIcon />
              <p>contact@greenshop.com</p>
            </Box>
            <Box className={"middle-box"}>
              <LocalPhoneIcon />
              <p>+88 01911 717 490</p>
            </Box>
          </Stack>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            className="bottom-big-box"
          >
            <Box className={"bottom-box"}>
              <p className="bottom-big-text">My Account</p>
              <p>My Account</p>
              <p>Our Stores</p>
              <p>Contact us</p>
              <p>Career</p>
              <p>Specials</p>
            </Box>

            <Box className={"bottom-box"}>
              <p className="bottom-big-text">Help & Guide</p>
              <p>Help Center</p>
              <p>How to Buy</p>
              <p>Shipping & elivery</p>
              <p>Product Policy</p>
              <p>How to Return</p>
            </Box>

            <Box className={"bottom-box"}>
              <p className="bottom-big-text">Categories</p>
              <p>House Plants</p>
              <p>Potter Plants</p>
              <p>Seeds</p>
              <p>Small Plants</p>
              <p>Sccessories</p>
            </Box>

            <Box className={"bottom-social-media"}>
              <p className="bottom-social-media-header">Social Media</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "33px",
                }}
                className="bottom-social-media-icons"
              >
                <FacebookIcon
                  style={{ marginRight: "15px", fontSize: "35px" }}
                />
                <InstagramIcon
                  style={{ marginRight: "15px", fontSize: "35px" }}
                />
                <XIcon style={{ marginRight: "15px", fontSize: "35px" }} />
                <LinkedInIcon
                  style={{ marginRight: "15px", fontSize: "35px" }}
                />
                <YouTubeIcon
                  style={{ marginRight: "15px", fontSize: "35px" }}
                />
              </div>
              <p className="bottom-payment-types">We accept</p>
              <div className="payment-icons">
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-paypal"></i>
                <i className="fab fa-cc-amex"></i>
              </div>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Footers>
  );
}
