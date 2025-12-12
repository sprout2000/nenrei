type Forage = {
  year: number;
  month: number;
};

// biome-ignore lint: correctness/noExplicitAny: <NO-EXPLANATION>
export const isForage = (arg: any): arg is Forage => {
  return (
    typeof arg === "object" &&
    typeof arg.year === "number" &&
    typeof arg.month === "number"
  );
};
