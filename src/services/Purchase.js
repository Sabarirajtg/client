import axios from "axios";

const USER_API_URL = `http://localhost:8080/purchases`;

class Product {
  getAllPurchase() {
    return axios.get(USER_API_URL);
  }

  addPurchase(data) {
    return axios.post(USER_API_URL + "/", data);
  }

  getPurchase(id) {
    return axios.get(USER_API_URL + "/" + id);
  }
}
export default new Product();
