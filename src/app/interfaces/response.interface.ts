import { StatusResponse } from '../enums/status-response.enum';

export interface IResponse {
    status: StatusResponse;
    message: string;
    data?: any;
}
