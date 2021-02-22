import {RegistrationRequestType, RegistrationResponseType} from '../02-Features/02-Registration/registration-reducer';
import {instance} from './api';

export const registrationAPI = () => {
    return {
        registration: (dataReg: RegistrationRequestType) => {
            return instance.post<RegistrationResponseType>(`auth/register`, {...dataReg})
        }
    }
}
