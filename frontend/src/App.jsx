import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/v1";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingId, setEditingId] = useState(null);

  // LOGIN
  const login = async () => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    alert("Login success");
  };

  // REGISTER
  const register = async () => {
    await axios.post(`${API}/auth/register`, { name, email, password });
    alert("Registered. Now login.");
  };

  // GET TASKS
  const getTasks = async () => {
    const res = await axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data.tasks);
  };

  // CREATE TASK
  const createTask = async () => {
    if (!title) return alert("Enter title");

    if (editingId) {
      // update
      await axios.put(
        `${API}/tasks/${editingId}`,
        { title, description: desc, status: "pending" },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setEditingId(null);
    } else {
      // create
      await axios.post(
        `${API}/tasks`,
        { title, description: desc },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    }

    setTitle("");
    setDesc("");
    getTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getTasks();
  };

  useEffect(() => {
    if (token) getTasks();
  }, [token]);

  if (!token)
    return (
      <div style={{ padding: 40 }}>
        <h2>Register</h2>
        <input placeholder="name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>

        <h2>Login</h2>
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    );

  return (
    <div style={{ display: "block", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <h2>Dashboard</h2>

      <input
        placeholder="task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        placeholder="description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      /><br></br><br></br>
      <button onClick={createTask}>Add Task</button>

      <br /><br />
      <h3>Your Tasks</h3>
      {tasks.map((t) => (
        <div key={t._id}>
          <hr />
          Title: {t.title}<br></br>
          Description: {t.description}<br></br>
          Status: {t.status}<br></br><br></br>
          <button
            onClick={() => {
              setTitle(t.title);
              setDesc(t.description);
              setEditingId(t._id);
            }}
          >
            Edit
          </button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={() => deleteTask(t._id)}>Delete</button>
          <br></br><br />
        </div>
      ))}
    </div>
  );
}
