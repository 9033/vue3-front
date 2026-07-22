import { defineStore } from "pinia";

// setup stores
export const useStoreTabsStore = defineStore("storeTabs", () => {
  const data = {
    name: "name",
    age: "age",
  };
  // setup stores에서는 $reset함수를 직접 선언해야 함
  function $reset(){
    data.name = "name"
    data.age = "age"
  }
  return {
    tab: 1,
    data,
    $reset,
  };
});

// option stores
export const useStoreTabsOptionStore = defineStore("optionStoreTabs", {
  state: ()=>{
    const data = {
      name: "name",
      age: "age",
    };
    return {
      tab: 1,
      data,
    };
  }
});
