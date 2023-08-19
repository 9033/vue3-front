import { describe, it, expect, vi, test } from "vitest";
import routes from "../src/routes";
import { RouteRecordRaw } from "vue-router";

describe("components defined in route are exist?", () => {
  routes.forEach((route: RouteRecordRaw) => {
    if (!route.component) return;
    const name = route.name ?? route.path ?? "";
    const component = route.component as Function;
    test(name as string, async () => {
      const cmp = await component();
      expect(cmp).toBeDefined();
    });
  });
});

describe("every route has path", () => {
  routes.forEach((route: RouteRecordRaw) => {
    const name = route.name ?? route.path ?? "";
    test(name as string, async () => {
      expect(route.path).toBeDefined();
    });
  });
});

describe("paths are unique", () => {
  const exists: string[] = [];
  routes.forEach((route: RouteRecordRaw) => {
    const name = route.name ?? route.path ?? "";
    test(name as string, async () => {
      expect(!exists.includes(route.path)).toBeTruthy();
      exists.push(route.path);
    });
  });
});
