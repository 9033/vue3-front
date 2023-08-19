import range from "../src/script/range";
import { expect, test } from "vitest";

test("boundry: range(0, 1) === [0]", () => {
  expect(range(0, 1)).toStrictEqual([0]);
});

test("boundry: range(0, 0) === []", () => {
  expect(range(0, 0)).toStrictEqual([]);
});

test("range(0, 3) === [0,1,2]", () => {
  expect(range(0, 3)).toStrictEqual([0, 1, 2]);
});

test("range(0, 3, 2) === [0,2]", () => {
  expect(range(0, 3, 2)).toStrictEqual([0, 2]);
});

test("step under zero: range(0, 3, -1) === []", () => {
  expect(range(0, 3, -1)).toStrictEqual([]);
});

test("step under zero: range(0, 3, -100) === []", () => {
  expect(range(0, 3, -100)).toStrictEqual([]);
});

test("step is zero: range(0, 3, 0) to throw", () => {
  expect(() => range(0, 3, 0)).toThrow("step");
});

test("range(0, 3, 100) === [0]", () => {
  expect(range(0, 3, 100)).toStrictEqual([0]);
});

test("boundry: range(0, 100, 100) === [0]", () => {
  expect(range(0, 100, 100)).toStrictEqual([0]);
});

test("boundry: range(0, 101, 100) === [0, 100]", () => {
  expect(range(0, 101, 100)).toStrictEqual([0, 100]);
});

test("range(24, 43, 12) === [24, 36]", () => {
  expect(range(24, 43, 12)).toStrictEqual([24, 36]);
});

test("range(1, 2, 3) === [1]", () => {
  expect(range(1, 2, 3)).toStrictEqual([1]);
});

test("range(3, 2, 1) === []", () => {
  expect(range(3, 2, 1)).toStrictEqual([]);
});

// test("range(3, 2, -1) === [3, 2]", () => {
//   expect(range(3, 2, -1)).toStrictEqual([3, 2]);
// });
