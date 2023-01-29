import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
import { Send } from "@material-ui/icons";

// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import CustomTabs from "/components/CustomTabs/CustomTabs.js";
import Quote from "/components/Typography/Quote.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import { Button } from "@material-ui/core";
import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/tabsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionTabs() {
  const classes = useStyles();
  const [textInput, setTextInput] = useState("");
  const [response, setResponse] = useState();

  const onResponse = async (event) =>{
    console.log("Hello");
    event.preventDefault();
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log("Data Response", data)
      setResponse(data.response);
      setTextInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="nav-tabs">
          <h3>You: {textInput}</h3>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h3>
                <small>Your Input</small>
              </h3>
              <form onSubmit={onResponse}>
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "You:",
                      tabIcon: Face,
                      tabContent: (
                      <FormControl fullWidth>
                        <Input 
                          type="text" 
                          value={textInput} 
                          onChange={(e) => setTextInput(e.target.value)}
                        />
                        <Button type="submit" position="end">
                          <Send />
                        </Button>
                      </FormControl>
                      )
                    }
                  ]}
                  />
              </form>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h3>
                <small>JoyceAI:</small>
              </h3>
              <CustomTabs
                plainTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Joyce:",
                    tabIcon: Face,
                    tabContent: (
                      <div className={classes.typo}>
                        <Quote
                          text={response}
                          author="Joyce"
                        />
                      </div>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
