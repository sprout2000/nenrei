import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TitleBar } from "../TitleBar";

test("render TitleBar component", async () => {
  const spy = jest.fn();

  render(<TitleBar onToggleDrawer={spy} />);
  await userEvent.click(screen.getByRole("button"));
  expect(spy).toHaveBeenCalled();
});
