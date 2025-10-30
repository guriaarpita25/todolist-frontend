import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

function ItemDisplay() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);

    const getSingleTodo = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log(data);
            if (data.status === "success" && data.data?.todo) {
                setTodo(data.data.todo);
            } else {
                console.error("Failed to fetch todo:", data.message);
            }
        } catch (error) {
            console.error("Error fetching todo:", error);
        }
    }, [id]);

    useEffect(() => {
        getSingleTodo();
    }, [getSingleTodo]);

    if (!todo) return <p className="text-center mt-10">Loading...</p>;

    return (
        <>
            <div className="flex flex-col items-center mt-10 bg-sky-200 shadow-md rounded-lg p-6 w-[400px] mx-auto">
                <p className="text-gray-700 font-semibold text-lg">Todo ID: {id}</p>
                <p className="text-gray-700 text-xl mt-2 font-bold">{todo.title}</p>
                <p className="text-gray-700 mt-2 text-xl">{todo.description}</p>
                <p className="text-lg text-gray-700 mt-2">
                    Due Date: {new Date(todo.dueDate).toLocaleDateString()}
                </p>
            </div>
        </>
    );
}

export default ItemDisplay;
