import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({
    name: "rh",
    age: 23,
  });
  return { userInfo };
});
