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

import { FormControl } from "@material-ui/core";
import Input from "@material-ui/core/Input";

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

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";

import Router from "next/router";
import Session from "../../utils/session";

import { removeToken } from "../../lib/token.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [email, setEmail] = useState("");
  console.log(email);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState(null);

  const [session, setSession] = useState('');

  const alert = (message === null) ? <div/> : <div className={`alert alert-danger`} role="alert">{message}</div>;

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
    removeToken();
  }, []);

  if (session && session.loggedin) {
    if (typeof window === 'undefined') {
      // server-side rendering
      res.redirect('/components');
    } else {
      // client-side rendering
      Router.push('/components');
    }
    return null;
  }

  async function handleEmailChange(event) {
    setEmail(
      event.target.value.trim()
    )

    console.log(event);
  }

  async function handlePasswordChange(event) {
    setPassword(
      event.target.value.trim()
    )
  };
  
  async function handleLogin(event){
    e.preventDefault();

    setMessage(null);
    if (!email || !password) {
      this.setState({
        message: 'Email/Password is empty!'
      })

      return
    };

    let data = {
      email: email,
      password: password
    }

    console.log("Email", data)

    fetch('auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      if (response.loggedin) {
        Router.push(`/components`)
      } else if (response.message) {
        setMessage({
          message: response.message
        })
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
                <form onSubmit={handleLogin} className={classes.form}>
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
                        placeholder="Username"
                        type="email"
                        name="email"
                        id="userEmail"
                        value={email}
                        endAdornment={<InputAdornment position="end"><People className={classes.inputIconsColor} /></InputAdornment>}
                        onChange={handleEmailChange}
                        // onChange={(e) => setUsername(e.target.value)}
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
                        // onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                  </CardBody>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg" disabled={isLoading}>
                      Login
                    </Button>
                  </CardFooter>
                  <p style={{marginBottom: 10}} className={classes.divider}>Don't have an account yet? 
                    <Link href="/auth/register">
                      Register
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
