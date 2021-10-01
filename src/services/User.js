import axios from "axios";

const USER_API_URL = `http://localhost:8080/users`;

class User {
  getAllUsers() {
    return axios.get(USER_API_URL);
  }

  login(email, password) {
    return axios.post(USER_API_URL + "/login/", {
      email: email,
      password: password,
    });
  }

  getPurchases(id){
    return axios.get(USER_API_URL + "/" + id);
  }

  addPurchase(id, data) {
    return axios.post(USER_API_URL + "/" + id, data);
  }

  addUser(data) {
    return axios.post(USER_API_URL + "/", data);
  }
}
export default new User();
