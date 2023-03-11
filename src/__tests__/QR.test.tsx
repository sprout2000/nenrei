import { render } from "@testing-library/react";
import { QR } from "../QR";

test("render QR component", () => {
  render(<QR onClose={() => vi.fn()} qrOpen={true} />);
});
