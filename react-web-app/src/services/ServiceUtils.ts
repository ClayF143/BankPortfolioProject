import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import config from "../config";

interface IServiceProp {
    getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>;
}

const ServiceUtils = {
    getAccessToken: async ({ getAccessTokenSilently }: IServiceProp ) => {
        return await getAccessTokenSilently({
            authorizationParams: {
                audience: `${config.auth0ApiIdentifier}`
            }
        })
    }
};

export default ServiceUtils;