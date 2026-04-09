import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Register from "../src/pages/Register.tsx";
import React from "react";
jest.mock("@server");

describe("Register", () => {
    test("renders form and submit button", () => {
        render(<MemoryRouter><Register /></MemoryRouter>);

        expect(screen.getByPlaceholderText("example@email.com")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Register"})).toBeInTheDocument();
    });
    test("allows user to type in inputs", () => {
        render(<MemoryRouter><Register /></MemoryRouter>);

        const usernameInput = screen.getByPlaceholderText("example@email.com");
        const displaynameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const passwordConfirm = screen.getByPlaceholderText("Confirm Password");

        fireEvent.change(usernameInput, { target: { value: "test@email.com" } });
        fireEvent.change(displaynameInput, { target: { value: "user" } });
        fireEvent.change(passwordInput, { target: { value: "password" } });
        fireEvent.change(passwordConfirm, { target: { value: "password" } });

        expect(usernameInput.value).toBe("test@email.com");
        expect(displaynameInput.value).toBe("user");
        expect(passwordInput.value).toBe("password");
        expect(passwordConfirm.value).toBe("password");
    });

    test("missing email and password", async () => {
  
        render(<MemoryRouter><Register /></MemoryRouter>);

        fireEvent.click(screen.getByRole("button", { name: "Register" }));

        const usermsg = await screen.findByText("Please enter a display name.");
        expect(usermsg).toBeInTheDocument();

        const emailmsg = await screen.findByText("Please enter an email.");
        expect(emailmsg).toBeInTheDocument();

        const passmsg = await screen.findByText("Please enter your password.");
        expect(passmsg).toBeInTheDocument();
    });

    test("invalid email", async () => {
  
        render(<MemoryRouter><Register /></MemoryRouter>);

        fireEvent.change(screen.getByPlaceholderText("example@email.com"), {
        target: { value: "john" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Register" }));

        const emailmsg = await screen.findByText("Please enter a valid email.");
        expect(emailmsg).toBeInTheDocument();
    });
});