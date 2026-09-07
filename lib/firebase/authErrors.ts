export function getAuthErrorMessage(error: unknown, mode: "login" | "register"): string {
  const code = (error as { code?: string })?.code ?? "";

  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return mode === "login"
        ? "No account found with that email and password."
        : "Something went wrong. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}