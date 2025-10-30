import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";


function CreateTodo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState((new Date()).toISOString().split("T")[0])
    const navigate = useNavigate();

    const createTodos = async (e) => {
        e.preventDefault();
        const payload = {  //payload means body
            title,
            description,
            dueDate
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                alert("Create successful!");
                navigate("/home");
            } else {
                alert("Create unsuccessful!");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-10 text-blue-800">Create page</h1>
            <div className="flex justify-center mt-6 gap-4">
                <form className="bg-white shadow-lg rounded-2xl p-8 w-[350px]" onSubmit={createTodos} >
                    <input type="text" placeholder="title" value={title}
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none "
                        onChange={(e) => setTitle(e.target.value)} />
                    <textarea name="description" id="description" className="border border-gray-400 rounded-md p-2 w-full mt-2"
                        rows="4" cols="40" placeholder="write a short description" value={description}
                        onChange={(e) => setDescription(e.target.value)} >
                    </textarea>
                    <input type="date" value={dueDate}
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none "
                        onChange={(e) => setDueDate(e.target.value)} />
                    <button
                        type="submit"
                        className="w-full  text-white py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
                    >
                        Save
                    </button>
                </form>

            </div>
        </>
    )
}
export default CreateTodo;





