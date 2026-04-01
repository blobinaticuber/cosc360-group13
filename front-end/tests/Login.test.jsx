import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "..\pages\Login.tsx";
import React from "react";

describe("Login", () => {
    test("renders form and submit button", () => {
        render(<Login />);

        expect(screen.getByPlaceholderText("example@email.com")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Log In"})).toBeInTheDocument();
    });
    test("allows user to type in inputs", () => {
        render(<Login />);

        const usernameInput = screen.getByPlaceholderText("example@email.com");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(usernameInput, { target: { value: "test" } });
        fireEvent.change(passwordInput, { target: { value: "password" } });

        expect(usernameInput.value).toBe("test@email.com");
        expect(passwordInput.value).toBe("password");
    });

    test("missing email and password", async () => {
  
        render(<Login />);

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        const emailmsg = await screen.findByText("Please enter your email.");
        expect(emailmsg).toBeInTheDocument();

        const passmsg = await screen.findByText("Please enter your password.");
        expect(passmsg).toBeInTheDocument();
    });

    test("invalid email", async () => {
  
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText("Username"), {
        target: { value: "john" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        const emailmsg = await screen.findByText("Please enter a valid email.");
        expect(emailmsg).toBeInTheDocument();
    });
});