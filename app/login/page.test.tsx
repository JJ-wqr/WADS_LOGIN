import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./page";

// 🔹 Mock Next Router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// 🔹 Mock Firebase Auth
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

// 🔹 Mock Firebase config
jest.mock("@/lib/firebase", () => ({
  auth: {},
}));

// 🔹 Mock sonner toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Login Page", () => {
  it("renders login inputs and buttons", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
    expect(screen.getByText(/login with email/i)).toBeInTheDocument();
  });

  it("allows user to type email and password", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await userEvent.type(emailInput, "test@email.com");
    await userEvent.type(passwordInput, "123456");

    expect(emailInput).toHaveValue("test@email.com");
    expect(passwordInput).toHaveValue("123456");
  });
});