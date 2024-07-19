import axios from "axios";
import config from "../config";

const ServiceFactory = {
  fetch: <T>(endpoint: string) => {
    return async (accessToken: string, id: number): Promise<T> => {
      const response = await axios.get(`${config.baseApiUrl}/${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    };
  },

  fetchNoId: <T>(endpoint: string) => {
    return async (accessToken: string): Promise<T> => {
      const response = await axios.get(`${config.baseApiUrl}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    }
  },

  add: <T>(endpoint: string) => {
    return async (accessToken: string, data: T): Promise<void> => {
      await axios.post<T>(`${config.baseApiUrl}/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    };
  },

  update: <T>(endpoint: string) => {
    return async (accessToken: string, data: T): Promise<void> => {
      await axios.put<T>(`${config.baseApiUrl}/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    };
  },

  delete: (endpoint: string) => {
    return async (accessToken: string, id: number): Promise<void> => {
      await axios.delete(`${config.baseApiUrl}/${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    };
  },
}

export default ServiceFactory;