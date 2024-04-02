import axios from "axios";
import config from "../config";

class GenericService<T> {
  constructor(private controllerName: string) {}

  protected get baseControllerUrl(): string {
    return `${config.baseApiUrl}/${this.controllerName}`;
  }

  async fetchAll(accessToken: string): Promise<T[]> {
    const response = await axios.get(`${this.baseControllerUrl}/getall`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  }

  async fetch(accessToken: string, id: number): Promise<T> {
    const response = await axios.get(`${this.baseControllerUrl}/get/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  }

  async add(accessToken: string, data: T): Promise<void> {
    const response = await axios.post<T>(`${this.baseControllerUrl}/add`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  async update(accessToken: string, id: number, data: T): Promise<void> {
    const response = await axios.put<T>(`${this.baseControllerUrl}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  async delete(accessToken: string, id: number): Promise<void> {
    const response = await axios.delete<T>(`${this.baseControllerUrl}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

};

export default GenericService;