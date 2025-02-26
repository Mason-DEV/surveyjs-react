import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_PATH = `${API_URL}/forms`;

class FormsService {
  static async getForm(id) {
    const { data } = await axios.get(`${BASE_PATH}/${id}`);
    return data;
  }

  static async getForms() {
    const { data } = await axios.get(BASE_PATH);
    return data;
  }

  static async createForm(formData = {}) {
    const { data } = await axios.post(BASE_PATH, formData);
    return data;
  }

  static async updateForm(id, formData) {
    const { data } = await axios.post(`${BASE_PATH}/${id}`, formData);
    return data;
  }

  static async deleteForm(id) {
    const { data } = await axios.delete(`${BASE_PATH}/${id}`);
    return data;
  }
}

export default FormsService;
