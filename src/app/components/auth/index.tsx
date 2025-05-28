import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Card, Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
// import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../../hooks/useGlobals";
import { Login as LoginIcon } from "@mui/icons-material";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const {
    signupOpen,
    loginOpen,
    handleSignupClose,
    handleLoginClose,
    setSignupOpen,
    setLoginOpen,
  } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();
  const [showSignup, setShowSignup] = useState(false);

  // Handler to switch to the signup form
  const handleSignUp = () => {
    setShowSignup(true); // Show the signup page
  };

  /** HANDLERS **/

  const handleUserName = (e: T) => {
    console.log("e.target.value", e.target.value);
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    console.log("e.target.value", e.target.value);
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    console.log("e.target.value", e.target.value);
    setMemberPassword(e.target.value);
  };

  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFullFill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFullFill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFullFill = memberNick !== "" && memberPassword !== "";
      if (!isFullFill) {
        throw new Error(Messages.error3);
      }
      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Card
            sx={{
              width: "450px",
              padding: "40px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #f8fafc, #e8eff3)",
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
              },
            }}
          >
            <h2
              style={{
                marginBottom: "25px",
                color: "#4a4a4a",
                fontWeight: "700",
                fontSize: "28px",
                letterSpacing: "0.5px",
              }}
            >
              Create Account
            </h2>

            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              sx={{
                my: "12px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
              onChange={handleUserName}
            />

            <TextField
              id="phone"
              label="Phone number"
              variant="outlined"
              fullWidth
              sx={{
                my: "12px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
              onChange={handlePhone}
            />

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{
                my: "12px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
              onChange={handlePassword}
            />

            <Fab
              sx={{
                width: "160px",
                height: "50px",
                marginTop: "25px",
                backgroundColor: "#1976d2",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                transition: "all 0.3s ease",
              }}
              variant="extended"
              onClick={handleSignupRequest}
            >
              <LoginIcon sx={{ mr: 1 }} />
              Sign Up
            </Fab>

            <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
              Already have an account?{" "}
              <Button
                sx={{ textTransform: "none", padding: "0" }}
                onClick={() => {
                  setSignupOpen(false);
                  setLoginOpen(true);
                }}
              >
                Log in
              </Button>
            </p>
          </Card>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Card
            sx={{
              width: "500px",
              padding: "30px",
              borderRadius: "15px",
              background: "linear-gradient(135deg, #ece9e6, #ffffff)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}
            >
              Login
            </h2>

            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ my: "10px", backgroundColor: "#fff", borderRadius: "8px" }}
              onChange={handleUserName}
            />

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{ my: "10px", backgroundColor: "#fff", borderRadius: "8px" }}
              onChange={handlePassword}
            />

            <Button
              sx={{
                alignSelf: "flex-end",
                marginBottom: "10px",
                textTransform: "none",
              }}
              onClick={() => alert("Contact to admin")}
            >
              Forgot password?
            </Button>

            <Fab
              sx={{
                width: "150px",
                height: "45px",
                backgroundColor: "#1976d2",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                transition: "all 0.3s ease",
                marginBottom: "20px",
              }}
              variant="extended"
              onClick={handleLoginRequest}
            >
              <LoginIcon sx={{ mr: 1 }} />
              Login
            </Fab>

            <p style={{ margin: "0 0 10px 0" }}>
              Don't have an account?{" "}
              <Button
                sx={{ textTransform: "none", padding: "0" }}
                // onClick={handleSignUp}
                onClick={() => {
                  setLoginOpen(false);
                  setSignupOpen(true);
                }}
              >
                Sign up
              </Button>
            </p>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
