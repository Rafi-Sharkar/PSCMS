"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Link from "next/link";

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode;}>) {

  const [role, setRole] = useState("");
  const [ownerbus, setOwnerBus] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setRole(decoded.role);
      setOwnerBus(decoded.businessId);
    }
  }, []);
  
  return (
        <div>
          <div className="">
            {role === "CUSTOMER" && <CustomerDashboard />}
            {role === "FARMER" && <FarmerDashboard />}
            {role === "OWNER" && <OwnerDashboard ownerbus={ownerbus}/>}
            {role === "EMPLOYEE" && <EmployeeDashboard />}
          </div>
          {children}
        </div>
  );
}



// Each sub-dashboard
function CustomerDashboard() {
  return (
    <div className=" w-full flex justify-evenly font-semibold px-12 py-4 fixed top-16">
      <hr />
      <h2 className="bg-gray-200 py-2 px-6 rounded-2xl shadow-md">Customer Dashboard</h2>
      <ul className="bg-gray-200 flex gap-10 px-20 py-2 rounded-2xl shadow-md">
        <Link href={'/'}><li className="hover:underline">Create Order</li></Link>
        <Link href={'/'}><li className="hover:underline">View Order</li></Link>
      </ul>
    </div>
  );
}

function FarmerDashboard() {
  return (
    <div className=" w-full flex justify-evenly font-semibold px-12 py-4 fixed top-16">
      <hr />
      <h2 className="bg-gray-200 py-2 px-6 rounded-2xl shadow-md">Farmar Dashboard</h2>
      <ul className="bg-gray-200 flex gap-10 px-20 py-2 rounded-2xl shadow-md">
        <Link href={'/'}><li className="hover:underline">Create FarmStock</li></Link>
        <Link href={'/'}><li className="hover:underline">Manage FarmStock</li></Link>
        <Link href={'/'}><li className="hover:underline">View OwnerOrder</li></Link>
      </ul>
    </div>
  );
}

function OwnerDashboard({ ownerbus }: { ownerbus: boolean }) {
  return (
    <div className=" w-full flex justify-center gap-20 font-semibold  py-4 fixed top-16">
      <hr />
      <h2 className="bg-gray-200 py-2 px-6 rounded-2xl shadow-md">Owner Dashboard </h2>
      <ul className="bg-gray-200 flex gap-10 px-20 py-2 rounded-2xl shadow-md">
        {ownerbus===undefined?
        <Link href={'/dashboard/business/create'}><li className="hover:underline">Create Business</li></Link>:       
        <Link href={'/'}><li className="hover:underline">Manage Business</li></Link>
      }
      </ul>
    </div>
  );
}

function EmployeeDashboard() {
  return (
    <div className=" w-full flex justify-evenly font-semibold px-12 py-4 fixed top-16">
      <hr />
      <h2 className="bg-gray-200 py-2 px-6 rounded-2xl shadow-md">Employee Dashboard</h2>
      <ul className="bg-gray-200 flex gap-10 px-20 py-2 rounded-2xl shadow-md">
        <Link href={'/'}><li className="hover:underline">View Assigned Collection</li></Link>
      </ul>
    </div>
  );
}

