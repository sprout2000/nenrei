import "jest-canvas-mock";
import { render } from "@testing-library/react";
import { QR } from "../QR";

test("render QR component", () => {
  render(<QR onClose={() => jest.fn()} qrOpen={true} />);
});
