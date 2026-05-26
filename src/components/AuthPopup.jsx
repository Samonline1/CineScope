import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../redux/featureSlice";

const AuthPopup = ({
  isOpen,
  mode = "login",
  title,
  subtitle,
  dismissible = true,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.note.users);
  const [authMode, setAuthMode] = useState(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const validatePassword = () => {
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Add at least one uppercase letter");
      return false;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Add at least one lowercase letter");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("Add at least one number");
      return false;
    }

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      toast.error("Add at least one special character");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    if (authMode === "signup") {
      if (!name.trim()) {
        toast.error("Name is required");
        return;
      }

      if (!validatePassword()) {
        return;
      }

      const existingUser = users.find(
        (user) => user.email?.toLowerCase() === email.trim().toLowerCase(),
      );

      if (existingUser) {
        toast.error("An account with this email already exists");
        return;
      }

      const registeredUser = {
        name: name.trim(),
        email: email.trim(),
        password,
        username: `${name.trim().replace(/\s+/g, "") || "guest"}CineScope${Date.now().toString(36)}`,
        favorites: [],
      };

      dispatch(registerUser(registeredUser));
      toast.success(`Welcome ${registeredUser.name}`, { autoClose: 1000 });
      resetForm();
      onSuccess?.(registeredUser);
      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.email?.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password,
    );

    if (!matchedUser) {
      toast.error("Invalid email or password");
      return;
    }

    dispatch(loginUser(matchedUser));
    toast.success(`Welcome back ${matchedUser.username}`, { autoClose: 1000 });
    resetForm();
    onSuccess?.(matchedUser);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111] p-6 text-white shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-500">
              CineScope Access
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {title || (authMode === "login" ? "Sign in to continue" : "Create your account")}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {subtitle || "Log in to search, open details, and manage favorites."}
            </p>
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300"
            >
              Close
            </button>
          )}
        </div>

        <div className="mt-5 flex rounded-2xl border border-white/10 bg-black/40 p-1">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`flex-1 rounded-2xl px-4 py-2 text-sm ${authMode === "login" ? "bg-red-600 text-white" : "text-gray-400"}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("signup")}
            className={`flex-1 rounded-2xl px-4 py-2 text-sm ${authMode === "signup" ? "bg-red-600 text-white" : "text-gray-400"}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {authMode === "signup" && (
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 outline-none"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          )}

          <input
            className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500"
          >
            {authMode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPopup;
