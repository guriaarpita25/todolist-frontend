import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function UpdateTodo() {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState((new Date()).toISOString().split("T")[0])
    const navigate = useNavigate();

    const getAllTodos = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            setTodos(data?.data?.todos);
        } catch (e) {
            console.log(e, "error")
        }
    }

    const handleupdate = async () => {
        try {
            console.log("Inside!");
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    dueDate
                }),
            });

            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                alert("updateTodo successful!");
                navigate("/home");
            } else {
                alert("updateTodo unsuccessful!");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    }

    useEffect(() => {
        getAllTodos()
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            const curr = todos.find(x => x["_id"] === id);
            console.log(curr);
            setTitle(curr.title);
            setDescription(curr.description);
            setDueDate(curr.dueDate.split("T")[0]);
        }
    }, [todos]);

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-10 text-blue-800">update todo</h1>
            <div className="flex justify-center mt-6 gap-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-[350px]" >
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

                    <button className="w-full text-white py-3 rounded-lg bg-orange-600" onClick={() => {
                        handleupdate();
                    }}>Update</button>
                </div>
            </div>
        </>
    )
}
export default UpdateTodo;