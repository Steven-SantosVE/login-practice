import axios from "axios";
import api from "./AxiosConfig";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants"

class UserService {
    static register = async (username, password) => {
      try {
        const response = await api.post(`/api/users/register/`, {
          username,
          password
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    };
    
    static login = async (username, password) =>{
      try{
        const response = await api.post(`/api/token/`, {
          username,
          password
        })

        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh)

        // console.log(response.data.access)
        return response.data
      }catch(err){
        throw err;
      }
    }

    static logout = async () => {
    const refresh = localStorage.getItem('refresh');

      try {
          await api.post('/api/logout/', {
              refresh: refresh
          });
      } finally {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
      }
    };
}

export default UserService;