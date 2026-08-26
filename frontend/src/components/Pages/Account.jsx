import { useState } from "react";
import Signup from "./Signup";
import SignIn from "./SignIn";
import "./Account.css";

function Account() {
    const [mode, setMode] = useState("signin"); // "signup" | "signin"

    return (
        <div>
            <div className="account-tabs">
                <button
                    className={`account-tab ${mode === "signin" ? "active" : ""}`}
                    onClick={() => setMode("signin")}
                >
                    Sign In
                </button>

                <button
                    className={`account-tab ${mode === "signup" ? "active" : ""}`}
                    onClick={() => setMode("signup")}
                >
                    Sign Up
                </button>
            </div>

            {mode === "signin" ? <SignIn /> : <Signup />}
        </div>
    );
}

export default Account;