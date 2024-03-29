import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SideBar } from "../SideBar";

test("render SideBar component", async () => {
  window.open = jest.fn();
  const openSpy = jest.spyOn(window, "open");

  render(
    <SideBar
      drawerOpen={true}
      onToggleQR={() => jest.fn()}
      onToggleDrawer={() => jest.fn()}
    />
  );

  await userEvent.click(screen.getByLabelText("repo"));
  expect(openSpy).toHaveBeenCalled();
});
