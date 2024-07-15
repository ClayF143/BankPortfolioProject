import axios from "axios";
import config from "../config";

const ServiceFactory = {
  writeOnlyService: <T>(controllerName: string) => {
    return {
      add: async (accessToken: string, data: T): Promise<void> => {
        const response = await axios.post<T>(`${config.baseApiUrl}/${controllerName}/add`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
      },

      update: async (accessToken: string, id: number, data: T): Promise<void> => {
        const response = await axios.put<T>(`${config.baseApiUrl}/${controllerName}/update/${id}`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    }
  },
}

export default ServiceFactory;