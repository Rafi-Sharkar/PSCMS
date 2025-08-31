"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Fetch user info on load
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    fetch("http://localhost:5000/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated info
  const handleSave = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    console.log(formData)

    try {
      const res = await fetch("http://localhost:5000/auth/me/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          password: formData.password
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedUser = await res.json();
      setUser(updatedUser);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
  <div className="min-h-[77.3vh] pb-8 mt-18">
    <div className="max-w-xl mx-auto p-6 mt-16 border-2 shadow-2xl bg-gray-100 rounded-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

      {/* Profile Image */}
      <div className="flex items-center gap-4 mb-4 ">
        <img
          src={user.imageUrl || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-900"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>

      {/* View or Edit Mode */}
      {editMode ? (
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded"
          />
          {/* <input
            type="text"
            name="password"
            // value={formData.password || ""}
            onChange={handleChange}
            placeholder="User password"
            className="w-full border p-2 rounded"
          /> */}

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p>
            <b>Phone:</b> {user.phone}
          </p>
          <p>
            <b>Role:</b> {user.role}
          </p>
          <p>
            <b>Address:</b> {user.address || "Not set"}
          </p>
          <p className="font-bold">
            {user.businessId?`Business ID: `:''}
            <span className="font-normal">{user.businessId?`${user.businessId}`:''}</span>
          </p>

          <button
            onClick={() => setEditMode(true)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  </div>
  );
}
