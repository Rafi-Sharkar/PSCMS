"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type BusinessForm = {
  name: string;
  description: string;
  address: string;
};

export default function CreateBusinessPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessForm>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [ownerId, setOwnerId] = useState("")

  useEffect(() => {
  const token = Cookies.get("token");
  if (token) {
  const decoded: any = jwtDecode(token);
  setOwnerId(decoded.id);
  }
  }, []);

  const onSubmit = async (data: BusinessForm) => {
    try {
      setLoading(true);
      setMessage("");
      // Get ownerId from decoded JWT (or API /auth/me)

      const token = Cookies.get("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          ownerId, 
        }),
      });
      Cookies.remove("token");
      window.location.href = "/auth/login";

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create business");
      }

      const result = await res.json();
      setMessage(`Business created successfully: ${result.name}`);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[77.3vh] mt-18 pb-6 ">
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Business</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium">Business Name</label>
          <input
            type="text"
            {...register("name", { required: "Business name is required" })}
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Business"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
    <p className="text-center font-semibold">After creating you have to relogin</p>
    </div>
  );
}

