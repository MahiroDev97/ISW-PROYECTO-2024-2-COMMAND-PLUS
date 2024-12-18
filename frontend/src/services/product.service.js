import axios from "./root.service.js";

export async function getProducts() {
  try {
    const response = await axios.get("/product");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAvailableProducts() {
  try {
    const response = await axios.get("/product/disponibles");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`/product/detail/?id=${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function createProduct(data) {
  try {
    const response = await axios.post("/product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateProduct(id, data) {
  try {
    const response = await axios.patch(`/product/detail/?id=${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`/product/detail/?id=${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
