import axios from "axios";

const USER_API_URL = `http://localhost:8080/products`;

class Product {
  getAllProducts() {
    return axios.get(USER_API_URL);
  }

  getProduct(id) {
    return axios.get(USER_API_URL + "/" + id);
  }

  addProduct(data) {
    return axios.post(USER_API_URL + "/", data);
  }
}
export default new Product();
