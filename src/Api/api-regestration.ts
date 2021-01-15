import {RegistrationRequestType, RegistrationResponseType} from "../Redux/reducers/registrationReducer";
import {instance} from "./api";


//API
export const registrationAPI = () => {
    return {
        registration: (dataReg: RegistrationRequestType) => {
            return instance.post<RegistrationResponseType>(`auth/register`, {...dataReg})
        }
    }
}