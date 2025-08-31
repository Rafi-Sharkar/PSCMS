// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function registerUser(data: {
  name: string;
  phone: string;
  role: string;
  password: string;
}) {
    console.log(data)
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        role: data.role,
        password: data.password
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to register: ${res.status}`);
  }

  return res.json(); // backend response
}

// lib/api.ts
export const loginUser = async (data: { phone: string; password: string; }) => {
  console.log("phone: ", data.phone, 'password: ', data.password)
  const res = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone,
        password: data.password
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // { token: "JWT_TOKEN" }
};

