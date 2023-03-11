import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SideBar } from "../SideBar";

test("render SideBar component", async () => {
  window.open = vi.fn();

  render(
    <SideBar
      drawerOpen={true}
      onToggleQR={() => vi.fn()}
      onToggleDrawer={() => vi.fn()}
    />
  );

  await userEvent.click(screen.getByLabelText("repo"));
});
