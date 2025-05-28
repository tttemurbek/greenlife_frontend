import React, { useEffect } from "react";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow } from "@mui/joy";
import { Visibility } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import { DescriptionOutlined } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import AOS from "aos";
import "aos/dist/aos.css";

/* REDUX SLICE & SELECTOR*/
// setPopularDishes reduceri orqali setPopularDishes kommandasini hosil qilyabmiz
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  useEffect(() => {
    AOS.init({ duration: 1400 }); // You can adjust the animation duration or other options
  }, []);
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack data-aos="flip-up" className={"main"}>
          <Box className={"category-title"}>
            <StarIcon />
            Our VIP Clients
            <StarIcon />
          </Box>

          <Stack className={"cards-frame"}>
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  <CssVarsProvider key={member._id}>
                    <Card
                      className={"card"}
                      sx={{
                        width: "320px",
                        height: "320px",
                        margin: "20px 25px",
                        borderRadius: "50%",
                      }}
                    >
                      <CardCover>
                        <img src={imagePath} alt="" />
                        <StarIcon
                          sx={{
                            zIndex: "2",
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            color: "#8B8000",
                            height: "30px",
                            width: "30px",
                          }}
                        />
                        <CardContent
                          sx={{
                            justifyContent: "flex-end",
                            textTransform: "capitalize",
                          }}
                        >
                          <Stack
                            flexDirection={"row"}
                            justifyContent={"center"}
                          >
                            <Typography className={"member-nickname"}>
                              {member.memberNick}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </CardCover>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">VIP Clients Are Not Available Yet!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
