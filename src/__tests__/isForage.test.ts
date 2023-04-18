import { isForage } from "../lib/isForage";

const mockBirthday = { year: 1971, month: 3 };

test("test isForage()", () => {
  expect(isForage(mockBirthday)).toBeTruthy();
});
