import axios, { AxiosInstance } from "axios";

export default class Network {
  api: AxiosInstance

  constructor(baseUrl: string) {
    this.api = axios.create({
      baseURL: baseUrl,
    });

    this.api.interceptors.request.use((request) => {
      console.log(baseUrl + axios.getUri(request));
      return request;
    });
    
    this.api.interceptors.response.use((response) => {
      // console.log('Response:', response);
      return response;
    });
  }
}