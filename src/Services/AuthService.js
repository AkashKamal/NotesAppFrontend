import axios from 'axios';
import { useHistory,Redirect } from "react-router-dom";

class AuthService{

 login(details) {
   return axios.post(`http://localhost:8080/api/auth/signin`, {
    email : details.email,
   password:  details.password
}).then(res => {
    localStorage.setItem("token", res.data.jwt);
    console.log(res.data.jwt);
    return true
});
}

 logout() {
    localStorage.removeItem("token");
}

  isTokenAvailable(){
      console.log(localStorage.getItem("token"));
    return localStorage.getItem("token") != null ?  true :  false;
 }
}

export default new AuthService();

// export default {
//     login,logout
// };

