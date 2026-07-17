import { defineStore } from "pinia";

export const useStoreTabsStore = defineStore("storeTabs", () => {
  const data = {
    name: "name",
    age: "age",
  };
  return {
    tab: 1,
    data,
  };
});
