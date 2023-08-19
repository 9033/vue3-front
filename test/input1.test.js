import { mount } from "@vue/test-utils";
import Input1Vue from "../src/components/Input1.vue";
import { expect } from "vitest";

// input v-model 테스트
// https://test-utils.vuejs.org/guide/advanced/v-model.html
test("Input1: input to emit", async () => {
  const wrapper = mount(Input1Vue, {
    props: {
      data: {
        name: "name",
      },
    },
  });
  await wrapper.find("input").setValue("test");
  await wrapper.find("input").setValue("test2");
  const t = wrapper.emitted("change");
  expect(t[0][0]).toStrictEqual({ name: "test" });
  expect(t[1][0]).toStrictEqual({ name: "test2" });
});

test("Input1: props to input", async () => {
  const wrapper = mount(Input1Vue, {
    props: {
      data: {
        name: "name",
      },
    },
  });
  const input = wrapper.find("input");
  expect(input.element.value).toEqual("name");
  await wrapper.setProps({ data: { name: "goodbye" } });
  expect(input.element.value).toEqual("goodbye");
});
