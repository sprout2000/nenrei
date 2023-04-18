type Forage = {
  year: number;
  month: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isForage = (arg: any): arg is Forage => {
  return (
    typeof arg === "object" &&
    typeof arg.year === "number" &&
    typeof arg.month === "number"
  );
};
