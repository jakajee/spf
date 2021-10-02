import axios from "axios";

export interface BaseResponse {
    isSuccess: boolean,
    message: string
}

export default axios.create({
    url: "/"
});