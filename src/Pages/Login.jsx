import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
    const [data, setData] = useState({
        username: "DJ@4",
        password: "Dhunjam@2023",
    });
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.post("https://stg.dhunjam.in/account/admin/login", data);
            console.log(response);
            console.log(response.data);
            if (response?.data?.response === "Success") {
                localStorage.setItem("token", response?.data?.data?.token);
                localStorage.setItem("id", response?.data?.data?.id);
                toast.success("Login Success", { autoClose: 3000 });
                navigate("/admin");
            } else {
                toast.error('Login Failed.');
                console.log(response);
            }
        } catch (error) {
            // Handle errors here
            console.error("An error occurred during login:", error);
            toast.error('An error occurred during login. Please try again.');
        }
    };

    return (
        <>
        <Toaster toastOptions={{duration: 5000}}/>
        <div id="login">
            <h1>Venue Admin Login</h1>
            <div>
                <input
                    className="input"
                    id="name"
                    placeholder="name"
                    value={data.username}
                    onChange={(e) => {
                        setData((prevData) => ({
                            ...prevData,
                            username: e.target.value,
                        }));
                    }}
                ></input>
            </div>
            <div>
                <div className="password-input">
                    <input
                        className="input"
                        id="password"
                        type="password"
                        placeholder="password"
                        value={data.password}
                        onChange={(e) => {
                            setData((prevData) => ({
                                ...prevData,
                                password: e.target.value,
                            }));
                        }}
                    />
                </div>
            </div>
            <button id="submitButton" onClick={fetchData}>
                Login
            </button>
            <p>New Registration?</p>
        </div>
        </>
    );
}

export default Login;
