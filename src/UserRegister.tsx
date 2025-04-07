// src/UserRegister.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const UserRegister = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      //await createUserWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Register to Fit Track</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 px-4 py-2 w-full max-w-sm border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 px-4 py-2 w-full max-w-sm border border-gray-300 rounded"
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        onClick={handleRegister}
        className="w-full max-w-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Register
      </button>

      <p className="mt-4 text-sm text-gray-700">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer hover:underline">
          Login
        </span>
      </p>
    </div>
  )
}