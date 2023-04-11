import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
// const API_URL = process.env.REACT_APP_API_URL;
// Axios.defaults.baseURL = API_URL;

const register = (myData) => {
  console.log("Sentobject==",
    myData.attributes
  )
  return axios.post(API_URL + "signup", 
    myData.attributes
  );
};
const login = (myData) => {
  console.log("Mydata", myData)
  // const { usernameOrEmail, password } = myData.data.attributes;
  const requestData = {
    usernameOrEmail: myData.data.attributes.email || myData.data.attributes.username,
    password: myData.data.attributes.password,
  };

  console.log("SentInputLogin==", requestData);

  return axios
    .post(API_URL + "signin", requestData)
    .then((response) => {
      console.log("LoginResponse==", response);
      if (response.data.accessToken) {
        console.log("accessToke", response.data.accessToken)
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;