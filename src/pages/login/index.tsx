import React, { useState } from "react";
import { LoginForm } from "@/components/login/login-form";
import authProvider from "@/providers/authProvider";
import { ClipboardType } from "lucide-react";

/**
 * LoginPage is a page component that renders a login form. It uses the
 * {@link authProvider} to authenticate the user. If the authentication is
 * successful, it redirects the user to the root path. If the authentication
 * fails, it displays an error message.
 *
 * @returns A React component that renders a login form.
 */
export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("admin@ptracker.com");
  const [password, setPassword] = useState("123567");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authProvider.login({
        email,
        password,
        providerName: "",
      });

      if (response.success) {
        setEmail("");
        setPassword("");
        window.location.href = response.redirectTo || "/";
      } else {
        setErrorMessage(response.error?.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 lg:gap-0 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
            />
            {errorMessage && (
              <div className="mt-4 text-red-500">
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-black lg:flex items-center justify-center min-h-screen">
        <a
          href="#"
          className="flex items-center justify-center gap-2 font-medium"
          onClick={(e) => e.preventDefault()}
        >
          <div className="flex rounded-md text-primary-foreground gap-1 items-center">
            <ClipboardType size={110} />
            <div className="flex-col items-center justify-center">
              <h1 className="text-3xl font-bold tracking-tight">Project</h1>
              <h1 className="text-3xl font-bold tracking-tight">Tracker</h1>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
