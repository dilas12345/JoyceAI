// @mui material components
import React, {useEffect, useState} from 'react'
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import JoyceAI from "services/api/chat";

function UserInput(props) {

  const { onGeneratedText } = props;

  const [textInput, setTextInput] = useState("");
  const [response, setResponse] = useState("");
  const [stored, setStored] = useState("");
  const [getFeeds, setGetFeeds] = useState("");


  // const changeHandler = (e) => {
  //   setTextInput({
  //     ...textInput,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  useEffect(()=> {
    getInitialState();
  })

  const getInitialState = () => {
    var selectedOption = localStorage.getItem( 'InputedData' ) || 1;
    setGetFeeds(selectedOption)
    // console.log("FetchedState", selectedOption)
    return {
        selectedOption: selectedOption
    };
  }

  const setSelectedOption =() => {
    var options = textInput;
    localStorage.setItem( 'InputedData', options );
    setStored( { selectedOption: options } );
  }

  const onResponse = async (event) =>{
    event.preventDefault();
      
    
    const text = textInput;
  
    try {
      JoyceAI(text).then(
        (response) => {
          const generatedText = response.data.choices[0].text;
          setResponse(generatedText);
          onGeneratedText(generatedText);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    } catch (e) {
      console.log(e)
    }
  
    return () => {
      setInputs(
        textInput= ""
      );
    };
  }

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Your Input: {getFeeds}
        </MDTypography>
      </MDBox>
      <form onSubmit={onResponse}>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <MDInput label="Type here..." multiline rows={5} 
            type="textInput1"
            name="textInput1"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <MDButton variant="gradient" color="info" fullWidth type="submit">
            Send
          </MDButton>
        </MDBox>
      </MDBox>
      </form>
    </Card>
  );
}

export default UserInput;
