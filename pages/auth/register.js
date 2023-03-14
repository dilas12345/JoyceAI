import React, { useState, useEffect} from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import { Lock } from "@material-ui/icons";
// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";

import Router from "next/router";
import Session from "../../utils/session";

import { FormControl } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };

  const alert = (message === null) ? <div/> : <div className={`alert alert-danger`} role="alert">{message}</div>;

  const [session, setSession] = useState('');

  async function getSession(req, res) {
    let session = '';
      // server-side rendering
      if (req && req.session) {
        session = req.session;
      } else {
        session = await Session.getSession();
      }
    
    setSession(session);
  }

  useEffect(() => {
    getSession();
  }, []);

  async function handleNameChange(event){
    setFullName(
      event.target.value
    )
  }

  async function handleEmailChange(event){
    setEmail(
      event.target.value.trim()
    )
  }

  async function handlePasswordChange(event){
    setPassword(
      event.target.value.trim()
    )
  }

  async function handleConfirmPasswordChange(event){
    setConfirmPassword(
      event.target.value.trim()
    )
  }

  async function handleRegister(event) {
    event.preventDefault()

    setMessage({
      message: null
    })

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage({
        message: 'All fields are required!'
      })

      return
    }

    if (password !== confirmPassword) {
      setMessage({
        message: 'Password did not match!'
      })

      return
    }

    let data = {
      fullName: fullName,
      email: email,
      password: password
    }

    // console.log(data)
    fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
      // console.log(response.message)
      if (response.message) {
        setMessage({
          message: response.message
        })
      } else if (response.email) {
        // console.log(response.email)
        Router.push('/check-email?email=' + response.email)
      } else {
        setMessage({
          message: 'Unknown Error!'
        })
      }
    })
    .catch(error => {
      console.error('Error:', error)
      setMessage({
        message: 'Request Failed!'
      })
    })
  }
  

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  const { ...rest } = props;

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={handleRegister} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>

                    <FormControl style={{marginTop: 30}} fullWidth  variant="standard">
                      <Input
                        placeholder="Fullname"
                        type="text"
                        name="fullName"
                        id="userFullname"
                        value={fullName}
                        endAdornment={<InputAdornment position="end"><People className={classes.inputIconsColor} /></InputAdornment>}
                        onChange={handleNameChange}
                      />
                    </FormControl>
                    <FormControl style={{marginTop: 20}} fullWidth  variant="standard">
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="userEmail"
                        value={email}
                        endAdornment={<InputAdornment position="end"><Email className={classes.inputIconsColor} /></InputAdornment>}
                        onChange={handleEmailChange}
                      />
                    </FormControl>
                    <FormControl style={{marginTop: 30}} fullWidth  variant="standard">
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="userPassword"
                        value={password}
                        endAdornment={<InputAdornment position="end"><Lock className={classes.inputIconsColor} /></InputAdornment>}
                        onChange={handlePasswordChange}
                      />
                    </FormControl>
                    <FormControl style={{marginTop: 30}} fullWidth  variant="standard">
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        id="userConfirmPassword"
                        value={confirmPassword}
                        endAdornment={<InputAdornment position="end"><Lock className={classes.inputIconsColor} /></InputAdornment>}
                        onChange={handleConfirmPasswordChange}
                      />
                    </FormControl>
                  </CardBody>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <CardFooter style={{marginTop: 30}} className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg" disabled={isLoading}>
                      Register
                    </Button>
                  </CardFooter>
                  <p style={{marginBottom: 10}} className={classes.divider}>Already have an account? 
                    <Link href="/auth/login">
                      Login
                    </Link>
                  </p>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
