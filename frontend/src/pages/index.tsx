import React, { useState, useEffect } from "react";
import Card from "../Components/cardComponent";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiURL = "http://localhost:5000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ name: "", email: "", id: 0 });
  const [updateUser, setUpdateUser] = useState<User>({ name: "", email: "", id: 0 });

  // Fetch Users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to fetch only once

  // Create User
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiURL}/users`, newUser);
      setUsers([...users, newUser]);
      setNewUser({ name: "", email: "", id: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  // Update User
  const updateUserHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${apiURL}/users/${updateUser.id}`, updateUser);
      setUpdateUser({ name: "", email: "", id: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${apiURL}/users/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Update state after deletion
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container mx-auto justify-center">
      <h1 className="flex text-2xl justify-center m-6 font-bold">
        User Management
      </h1>

      {/* Create user */}
      <form onSubmit={createUser} className="flex justify-center m-6">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border-2 border-gray-500 p-2 m-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })
          }
          className="border-2 border-gray-500 p-2 m-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 m-2 px-4 rounded"
        >
          Add User
        </button>
      </form>

      {/* Update user */}
      <form onSubmit={updateUserHandler} className="flex justify-center m-6">
        <input
          type="text"
          placeholder="Name"
          value={updateUser.name}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, name: e.target.value })
          }
          className="border-2 border-gray-500 p-2 m-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={updateUser.email}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, email: e.target.value })
          }
          className="border-2 border-gray-500 p-2 m-2"
        />
        <input
          type="number"
          placeholder="ID"
          value={updateUser.id}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, id: parseInt(e.target.value) })
          }
          className="border-2 border-gray-500 p-2 m-2"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 m-2 px-4 rounded"
        >
          Update User
        </button>
      </form>

      {/* Display users */}
      <div className="grid grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-100 p-4 flex flex-col justify-center"> {/* Use user.id as the key */}
            <Card
              name={user.name}
              email={user.email}
              id={user.id}
            />
            {/* Delete button */}
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 hover:bg-red-700 mt-2 text-white font-bold py-1 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
