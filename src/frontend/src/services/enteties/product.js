import api from "../serviceAPI";

class ProductApi {
  constructor(api) {
    this.api = api;
  }

  async getProducts() {
    const { data } = await this.api.get(`products`);
    return data;
  }

  async getSingleProduct(productId) {
    const { data } = await this.api.get(`products/${productId}`);
    return data;
  }

  async deleteProduct(productId) {
    const { data } = await this.api.delete(`products/${productId}`);
    return data;
  }

  async createProduct(product) {
    const { data } = await this.api.post(`products`, product);
    return data;
  }

  async updateProduct(product) {
    const { data } = await this.api.put(
      `products/${product.id}`,
      product.product
    );
    return data;
  }
}

export default new ProductApi(api);
