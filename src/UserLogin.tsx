import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserLoginProps {
    endpoint: string;
    handleLoginSuccess: (username: string) => void;
}

export const UserLogin = ({ endpoint, handleLoginSuccess }: UserLoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${endpoint}/api/v1/user/login`, {
                email,
                password,
            });
            localStorage.setItem("idToken", response.data.idToken); // Save token to local storage
            handleLoginSuccess(response.data.username);
            navigate("/"); // Navigate to home page after login
        } catch (err) {
            setError("Invalid credentials or server error. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <Typography variant="h4" className="mb-6 text-center">Login</Typography>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-6"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                    disabled={!email || !password}
                >
                    Login
                </Button>
                <div className="mt-4 text-center">
                    <Typography variant="body2">
                        Don't have an account?{" "}
                        {/* <Link onClick={() => navigate("/register")} className="cursor-pointer">
                            Register
                        </Link> */}
                    </Typography>
                </div>
            </div>
        </div>
    );
};