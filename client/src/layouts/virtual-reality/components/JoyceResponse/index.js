// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useState } from "react";

function JoyceResponse(props, {noGutter}) {
  console.log("Props Response", props)
  const { generatedText } = props;
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [pdfGen, setPdfGen] = useState(false);
  const toggleSnackbar = () => setPdfGen(!pdfGen);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Joyce AI
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDButton variant="gradient" buttonColor="info" onClick={toggleSnackbar}>
        Open Snackbar
      </MDButton>
      
      <MDSnackbar
        color="info"
        icon="notifications"
        title="Your Generated document"
        content={generatedText}
        dateTime="11 mins ago"
        open={pdfGen}
        close={toggleSnackbar}
      />
      <MDBox pt={3} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <MDBox
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            bgColor={darkMode ? "transparent" : "grey-100"}
            borderRadius="lg"
            p={3}
            mb={noGutter ? 0 : 1}
            mt={2}
          >
            <MDBox width="100%" display="flex" flexDirection="column">
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
                mb={2}
              >
                <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                  Joyce Response
                </MDTypography>

                <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                  <MDBox mr={1}>
                    <MDButton variant="text" color="error">
                      <Icon>delete</Icon>&nbsp;delete
                    </MDButton>
                  </MDBox>
                  <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                    <Icon>edit</Icon>&nbsp;edit
                  </MDButton>
                  <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                    <Icon>edit</Icon>&nbsp;PDF
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                    {generatedText}
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

JoyceResponse.defaultProps = {
  noGutter: false,
};

export default JoyceResponse;
