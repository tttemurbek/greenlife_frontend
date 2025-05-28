import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  useEffect(() => {
    AOS.init({ duration: 1400 }); // You can adjust the animation duration or other options
  }, []);
  return (
    <div className="static-frame">
      <Container sx={{ textTransform: "capitalize" }}>
        <Stack data-aos="flip-up" className="info">
          <Stack className="static-box">
            <Box className="static-num">37</Box>
            <Box className="static-text">Flower Shops</Box>
          </Stack>

          <Divider height="64" width="2" bg="#E3C08d" />

          <Stack className="static-box">
            <Box className="static-num">8+</Box>
            <Box className="static-text">years experience in this field</Box>
          </Stack>

          <Divider height="64" width="2" bg="#E3C08d" />

          <Stack className="static-box">
            <Box className="static-num">60+</Box>
            <Box className="static-text">types of flowers and plants</Box>
          </Stack>

          <Divider height="64" width="2" bg="#E3C08d" />

          <Stack className="static-box">
            <Box className="static-num">500+</Box>
            <Box className="static-text">acive Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
