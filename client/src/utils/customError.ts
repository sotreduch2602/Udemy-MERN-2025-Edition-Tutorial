import axios from "axios";


const customError = (error: unknown) => {
    return axios.isAxiosError(error)
}

export default customError;
