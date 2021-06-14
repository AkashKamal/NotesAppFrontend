import axios from 'axios';

class AuthService {

  login(details) {
    const response = { status: "", errorMessage: "" };
    return axios.post(`http://localhost:8080/api/auth/signin`, {
      email: details.email,
      password: details.password
    }).then(res => {
      localStorage.setItem("token", res.data.jwt);
      response.status = "success";
      return response;
    }).catch(error => {
      response.status = "error";
      response.errorMessage = error.response.data.message;
      return response;
    });
  }

  signup(details){
    const response = { status: "", errorMessage: "" };
    return axios.post(`http://localhost:8080/api/auth/signup`, {
      email: details.email,
      password: details.password
    }).then(res => {
      response.status = "success";
      return response;
    }).catch(error => {
      response.status = "error";
      console.log(error)
      response.errorMessage = error.response.data.message;
      return response;
    });
  }

  logout() {
    localStorage.removeItem("token");
  }

  isTokenAvailable() {
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("token") != null ? true : false)
    return localStorage.getItem("token") != null ? true : false;
  }
}

export default new AuthService();
