import { mount } from "@vue/test-utils";
import Input2Vue from "../src/components/Input2.vue";
import { expect } from "vitest";

// input v-model 테스트
// https://test-utils.vuejs.org/guide/advanced/v-model.html
test("Input2: input to emit", async () => {
  const wrapper = mount(Input2Vue, {
    props: {
      data: {
        age: 11,
      },
    },
  });
  await wrapper.find("input").setValue(22);
  await wrapper.find("input").setValue(33);
  const t = wrapper.emitted("change");
  expect(t[0][0]).toStrictEqual({ age: 22 });
  expect(t[1][0]).toStrictEqual({ age: 33 });
});

test("Input2: props to input", async () => {
  const wrapper = mount(Input2Vue, {
    props: {
      data: {
        age: 11,
      },
    },
  });
  const input = wrapper.find("input");
  expect(input.element.value).toEqual(11);
  await wrapper.setProps({ data: { age: 22 } });
  expect(input.element.value).toEqual(22);
});
