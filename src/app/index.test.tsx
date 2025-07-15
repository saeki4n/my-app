import React from "react";
import { render, screen } from "@testing-library/react-native";
import Index from "./index";

describe("Index Component", () => {
  it("renders the app title", () => {
    render(<Index />);

    expect(screen.getByText("Memp App")).toBeTruthy();
  });

  it("renders logout button", () => {
    render(<Index />);

    expect(screen.getByText("ログアウト")).toBeTruthy();
  });

  it("renders shopping list items", () => {
    render(<Index />);

    const shoppingListItems = screen.getAllByText("買い物リスト");
    expect(shoppingListItems).toHaveLength(3);
  });
});
