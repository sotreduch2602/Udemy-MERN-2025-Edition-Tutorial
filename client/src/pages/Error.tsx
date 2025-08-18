import { Link, useRouteError } from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";


const Error = () => {
    const error = useRouteError();

    const isFoundError = (error:unknown) => {
        return error && typeof error === 'object' && 'status' in error && error.status === 404
    }

    if (isFoundError(error)) {
        return (
            <Wrapper>
                <div>
                    <img src={img} alt="not found" />
                    <h3>Ohh! page not found</h3>
                    <p>we cant see to find the page</p>
                    <Link to="/dashboard">Back to home</Link>
                </div>
            </Wrapper>
        )    
    }
    
    return (
        <div>
            <h1>Error</h1>
            <Link to={"/"}>back home</Link>
        </div>
    )
}

export default Error;