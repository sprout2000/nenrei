import { render } from "@testing-library/react";
import { TitleBar } from "../TitleBar";

test("render TitleBar component", () => {
  render(<TitleBar onToggleDrawer={() => jest.fn()} />);
});
