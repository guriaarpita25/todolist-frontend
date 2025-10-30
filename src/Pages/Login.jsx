import React, { useState } from "react";
import { useNavigate } from "react-router";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            password: password
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.status === "success") {

                localStorage.setItem("token", data.token);
                alert("Login successful!");
                navigate("/home");
            } else {
                alert("Login unsuccessful!");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };
    return (
        <>
            <div className="flex  justify-center items-center h-screen w-full">
                <form className="bg-white shadow-lg rounded-2xl p-8 w-[350px]" onSubmit={loginUser} >
                    <input type="email" placeholder="Email" value={email}
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none " onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button
                        type="submit"
                        className="w-full  text-white py-3 rounded-lg bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>

        </>
    )
}
export default Login;