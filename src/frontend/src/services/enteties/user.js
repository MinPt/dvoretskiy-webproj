import api from "../serviceAPI";

class UserApi {
  constructor(api) {
    this.api = api;
  }

  async getUsers() {
    const { data } = await this.api.get(`users`);
    return data;
  }

  async getSingleUser(userId) {
    const { data } = await this.api.get(`users/${userId}`);
    return data;
  }

  async deleteUser(userId) {
    const { data } = await this.api.delete(`users/${userId}`);
    return data;
  }

  async authUser(user) {
    const { data } = await this.api.post(`auth`, user);
    localStorage.setItem("jwtToken", data.jwtToken);
    return data;
  }

  async createUser(user) {
    const { data } = await this.api.post(`users`, user);
    localStorage.setItem("jwtToken", data.jwtToken);
    return data;
  }
}

export default new UserApi(api);
