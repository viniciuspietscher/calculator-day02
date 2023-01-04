export const add = (first: number, second: number): number => {
  if (isNaN(first) || isNaN(second) || first === null || second === null) {
    throw new Error("Expected numbers");
  }
  return first + second;
};

export const subtract = (first: number, second: number): number => {
  return first - second;
};

export const multiply = (first: number, second: number): number => {
  return first * second;
};

export const divide = (first: number, second: number): number => {
  return first / second;
};

