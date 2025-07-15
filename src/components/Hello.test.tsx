import React from "react";
import { render, screen } from "@testing-library/react-native";
import Hello from "./Hello";

describe("Hello Component", () => {
  it("renders Hello text with children", () => {
    render(<Hello>World</Hello>);

    expect(screen.getByText("Hello World")).toBeTruthy();
  });

  it("adds exclamation mark when ban is true", () => {
    render(<Hello ban={true}>Test</Hello>);

    expect(screen.getByText("Hello Test!")).toBeTruthy();
  });

  it("does not add exclamation mark when ban is false", () => {
    render(<Hello ban={false}>Test</Hello>);

    expect(screen.getByText("Hello Test")).toBeTruthy();
  });
});
