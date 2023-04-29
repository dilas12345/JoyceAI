import React, {useEffect, useState, useRef} from "react";
import Container from "@mui/material/Container";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Testimonials from "./sections/Testimonials";
import Download from "./sections/Download";

import {init} from "../../vr_playground";
import MDTypography from "components/MDTypography";

function VirtualReality() {
  const vr = init()
  // const containerRef = useRef(null);

  // useEffect(()=> {
  //   init(containerRef.current);
  // },[]);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
        <Container>
          <MDTypography>Hello Joyce World</MDTypography>
          <div vr/>
        </Container>
        {/* <Testimonials />
        <Download /> */}
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default VirtualReality;
