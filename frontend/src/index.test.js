import { render, screen } from "@testing-library/react";
import App from "./App";
import Home from "./pages/Home";

test("renders the landing page", () => {
  render(<Home />);

  expect(screen.getByRole("button", { name: "add" }));
  expect(screen.getAllByRole("img"));
});
