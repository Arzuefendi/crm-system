import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../src/style/userList.css";
import { MdDeleteOutline } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Header from "./Header";

const UsersList = ({ onLogout }) => {
  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    order: "",
    lastorder: "",
  });

  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocmNnb2R4eGhicW1raGlpeXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMDc3NTUsImV4cCI6MjA0NTU4Mzc1NX0.bnOwpMOSc2KX_LlvsYVJWIVPGdLRdgvkM66F1ATwjiI";

  useEffect(() => {
    const handleGet = async () => {
      try {
        const response = await axios.get(
          "https://phrcgodxxhbqmkhiiyuo.supabase.co/rest/v1/crm?select=*",
          {
            headers: {
              apiKey: apiKey,
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGet();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://phrcgodxxhbqmkhiiyuo.supabase.co/rest/v1/crm",
        newUser,
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );

      if (response.data && response.data.length > 0) {
        setData((prevData) => [...prevData, response.data[0]]);
        setNewUser({
          name: "",
          company: "",
          phone: "",
          email: "",
          order: "",
          lastorder: "",
        });
        setIsAdding(false);
      } else {
        console.log("No data returned from the POST request");
      }
    } catch (error) {
      console.log("Error adding user:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://phrcgodxxhbqmkhiiyuo.supabase.co/rest/v1/crm?id=eq.${id}`,
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${apiKey}`,
            Prefer: "return=minimal",
          },
        }
      );
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="users-box">
      <Navbar />
      <Header onLogout={onLogout} />
      <button id="addButton" onClick={() => setIsAdding(true)}>
        Əlavə et
      </button>
      <Modal show={isAdding} onHide={() => setIsAdding(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni müştəri əlavə et</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Ad və soyad"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Şirkət adı"
            value={newUser.company}
            onChange={(e) =>
              setNewUser({ ...newUser, company: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Mobil nömrə"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            Ləğv et
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Əlavə et
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Müştəri adı</th>
              <th>Şirkət adı</th>
              <th>Əlaqə Nömrəsi</th>
              <th>Elektron poçt</th>
              <th>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.company}</td>
                <td>{el.phone}</td>
                <td>{el.email}</td>
                <td>
                  <MdDeleteOutline onClick={() => handleDelete(el.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <a href="#">&laquo;</a>
        <a href="#" className="active">
          1
        </a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
      </div>
    </div>
  );
};

export default UsersList;
