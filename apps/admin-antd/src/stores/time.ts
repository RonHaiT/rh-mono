import { defineStore } from "pinia";
export const useCounterStore = defineStore(
  "counter",
  () => {
    let userInfo = ref({
      name: "rh",
      age: 23,
    });
    let timer = ref<NodeJS.Timeout | null>();
    const count = ref(0);
    const increment = () => {
      timer.value = setInterval(() => {
        count.value++;
      }, 1000);
    };
    return { count, timer, increment, userInfo };
  },
  {
    persist: [
      {
        key: "counter-count",
        pick: ["count"],
      },
      {
        key: "counter-userInfo",
        pick: ["userInfo"],
      },
    ],
  }
);
