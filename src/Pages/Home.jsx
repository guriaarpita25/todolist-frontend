import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";


function Home() {

    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTodos()
    }, []);

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

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.status === "success") {
                alert("Todo deleted successfully!");
                getAllTodos();
            } else {
                alert("Failed to delete todo.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong while deleting.");
        }
    };

return (
    <>
        <h1 className="text-4xl font-bold text-center mt-10 text-black-800">Welcome to home page</h1>
        <div className="flex justify-center mt-8 ">
            <button className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 w-[20%]"
                onClick={() => navigate('/create-todo')}>Add New</button>
        </div>
        <div className="flex justify-center mt-10">
            {todos.length > 0 ?
                <div className="flex flex-col gap-4 w-[80%] max-w-xl">
                    {todos.map((element, index) => (
                        <div key={element._id || index}
                            style={{ padding: 20, backgroundColor: "skyblue" }}>
                            <p>Title:{element?.title} </p>
                            <p>Description:{element?.description} </p>
                            <p>Status:{(new Date(element?.dueDate).toString())} </p>
                            <button className=" text-black py-2 px-2 rounded-lg bg-orange-400 w-[20%]"
                             onClick={() => {navigate(`/updateTodo/${element["_id"]}`);
                            }}>Update</button>
                            <button className=" text-black py-2 px-2 rounded-lg bg-red-600 w-[20%] ml-[20px]"
                             onClick={() => handleDelete(element._id)}  >Delete</button>
                             <button className=" text-black py-2 px-2 rounded-lg bg-blue-600 w-[20%] ml-[20px]"
                            onClick={() => navigate(`/ItemDisplay/${element._id}`)}>check</button>
                        </div>

                    )

                    )}

                </div>

                : <>No Data Found</>}
        </div>

    </>
)
}
export default Home;





