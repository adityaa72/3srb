if (typeof window !== "undefined") {
  throw new Error("You are trying to access server only code in client side");
}
