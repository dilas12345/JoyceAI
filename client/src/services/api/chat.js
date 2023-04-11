import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

const API_URL = "https://api.openai.com/v1/completions";
 

const apiKey = "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" //process.env.OPENAI_API_KEY

const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const joyceAI = (text) => {
  console.log("Mydata", text)
  
  const data = {
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6
  };

  console.log("SentInputJoyce==", data, {headers});

  return axios
    .post(API_URL, data, {headers})
    .then((response) => {
      console.log("Joyce Response==", response);
      
      return response;
    })
    .catch(error => {
      console.log(error)
    });
};

export default joyceAI;
