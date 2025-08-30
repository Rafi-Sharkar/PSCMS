"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Link from "next/link";

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode;}>) {

  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  return (
        <div>
          <div className="">
            {role === "CUSTOMER" && <CustomerDashboard />}
            {role === "FARMER" && <FarmerDashboard />}
            {role === "OWNER" && <OwnerDashboard />}
            {role === "EMPLOYEE" && <EmployeeDashboard />}
          </div>
          {children}
        </div>
  );
}



// Each sub-dashboard
function CustomerDashboard() {
  return (
    <div>
      <h2 className="text-xl">Customer Dashboard</h2>
      <ul>
        <li>Create New Order</li>
        <li>Track My Orders</li>
      </ul>
    </div>
  );
}

function FarmerDashboard() {
  return (
    <div>
      <h2 className="text-xl">Farmer Dashboard</h2>
      <ul>
        <li>Update Farm Stock</li>
        <li>View Connected Owner’s Orders</li>
      </ul>
    </div>
  );
}

function OwnerDashboard() {
  return (
    <div className=" w-full flex justify-evenly font-semibold px-12 py-4 fixed top-16">
      <hr />
      <h2 className="bg-gray-200 py-2 px-6 rounded-2xl shadow-md">Owner Dashboard</h2>
      <ul className="bg-gray-200 flex gap-10 px-20 py-2 rounded-2xl shadow-md">
        <Link href={'/'}><li className="hover:underline">Manage Business Stock</li></Link>
        <Link href={'/'}><li className="hover:underline">Create Owner Orders</li></Link>
        <Link href={'/'}><li className="hover:underline">Create Collection & Assign Employees</li></Link>
      </ul>
    </div>
  );
}

function EmployeeDashboard() {
  return (
    <div>
      <h2 className="text-xl">Employee Dashboard</h2>
      <ul>
        <li>Assigned Collections</li>
        <li>Update Pickup Status</li>
        <li>Deliver to Customers</li>
      </ul>
    </div>
  );
}

