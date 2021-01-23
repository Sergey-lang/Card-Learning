import {RegistrationRequestType, RegistrationResponseType} from "../00-Redux/registration-reducer";
import {instance} from "./api";


//01-API
export const registrationAPI = () => {
    return {
        registration: (dataReg: RegistrationRequestType) => {
            return instance.post<RegistrationResponseType>(`auth/register`, {...dataReg})
        }
    }
}