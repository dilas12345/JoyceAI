import axios from "axios";

const API_URL = "https://api.openai.com/v1/completions";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY

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
    top_p: 1.0,
    frequency_penalty: 0.8,
    presence_penalty: 0.6
  };


  return axios
    .post(API_URL, data, {headers})
    .then((response) => {
      response.data.choices[0].text;
      return response;
    })
    .catch(error => {
      console.log(error)
    });
};

export default joyceAI;
