import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Home, Face, CloudDownload } from "@material-ui/icons";


// @material-ui/icons

// core components
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Parallax from "../components/Parallax/Parallax.js";

import styles from "../styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import ProductSection from "../pages-sections/LandingPage-Sections/ProductSection.js";
import TeamSection from "../pages-sections/LandingPage-Sections/TeamSection.js";
import WorkSection from "../pages-sections/LandingPage-Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="JoyceAI"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter responsive image="/img/landing-bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Joyce's Story.</h1>
              <h4>
                JoyceAI is a personal assistance tool for education that can be 
                incredibly beneficial for students of all ages. 
                It provides students with the resources and guidance 
                they need to succeed, including tutoring services, 
                help in developing organizational skills, 
                and offering individualized instruction. Overall, 
                this type of personal assistance can make a significant 
                difference in a student's academic journey.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="/components"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Face className={classes.icons} />
                Talk to Joyce
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          {/* <TeamSection /> */}
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
