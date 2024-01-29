import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                Navigate('/dashboard');
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <div className="flex justify-center items-center grow bg-[#f4f7fd]">
            <div className="flex flex-col items-start justify-center p-8 rounded-lg bg-white gap-4 w-max">
                <h1 className="font-bold">Please Login to Enter!</h1>
                <form className="flex flex-col gap-2 w-full">
                    <label className="flex items-center justify-between w-full p-2 rounded-md bg-[#f4f7fd] gap-8">
                        <p className="font-bold opacity-50">Email:</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 border rounded-md text-sm"
                        />
                    </label>
                    <label className="flex items-center justify-between w-full p-2 rounded-md bg-[#f4f7fd] gap-8">
                        <p className="font-bold opacity-50">Password:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 border rounded-md text-sm"
                        />
                    </label>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className='mt-2 py-2 align-center w-full text-white bg-sky-600 rounded-full font-bold'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;