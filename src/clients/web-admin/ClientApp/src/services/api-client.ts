import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const gatewayEndpointLocation = process.env.REACT_APP_GATEWAY_LOCATION;
const tokenEndpointLocation = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/authentication/token`;

interface TokenResponse{
    accessToken: string;
}

class ApiClientInstance{
    private clientInstance : AxiosInstance = Axios.create({
        baseURL: gatewayEndpointLocation
    });

    private refreshAccessToken = () => {
        return Axios.post<TokenResponse>(tokenEndpointLocation).then(response => {
            return response.data.accessToken;
        }).then(accessToken => {
            this.clientInstance = Axios.create({
                headers: { 'Authorization': "Bearer " + accessToken },
                baseURL: gatewayEndpointLocation
            });
            this.clientInstance.interceptors.response.use(
                response => response,
                error => {
                    if(error.response.status === 401){
                        return Promise.reject(error);
                    }    
                }
            );
        });
    }

    public get = <TResponse>(url: string, config?: AxiosRequestConfig) => {

        return this.clientInstance.get<TResponse>(url, config).catch(error => {
            return this.getWithNewToken<TResponse>(url, config);
        });
    }
    
    private getWithNewToken<TResponse>(url: string, config?: AxiosRequestConfig | undefined) {
        return this.refreshAccessToken().then(() => {
            return this.clientInstance.get<TResponse>(url, config);
        });
    }

    public post = <TResponse>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return this.clientInstance.post<TResponse>(url, data, config).catch(error => {
            return this.postWithNewToken<TResponse>(url, data, config);
        });
    }
    
    private postWithNewToken<TResponse>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
        return this.refreshAccessToken().then(() => {
            return this.clientInstance.post<TResponse>(url, data, config);
        });
    }

    public put = <TResponse>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return this.clientInstance.put<TResponse>(url, data, config).catch(error => {
            return this.putWithNewToken<TResponse>(url, data, config);
        });
    }
    
    private putWithNewToken<TResponse>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
        return this.refreshAccessToken().then(() => {
            return this.clientInstance.put<TResponse>(url, data, config);
        });
    }

    public patch = <TResponse>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return this.clientInstance.patch<TResponse>(url, data, config).catch(error => {
            return this.patchWithNewToken<TResponse>(url, data, config);
        });
    }
    
    private patchWithNewToken<TResponse>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
        return this.refreshAccessToken().then(() => {
            return this.clientInstance.patch<TResponse>(url, data, config);
        });
    }

}

export const apiClient = new ApiClientInstance();