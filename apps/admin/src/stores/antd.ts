import { defineStore } from "pinia";
export const useAntdStore = defineStore(
  "antd",
  () => {
    const color = ref("#13c2c2");
    let borderRadius = ref(6);
    let colorList = ref([
      "#1677ff",
      "#ff4d4f",
      "#52c41a",
      "#faad14",
      "#722ed1",
      "#13c2c2",
      "#eb2f96",
      "#f5222d",
      "#2f54eb",
      "#389e0d",
    ]);
    const borderRadiusList = ref([0, 2, 4, 6, 10, 50]);
    return { color, colorList, borderRadius, borderRadiusList };
  },
  {
    persist: true,
  }
);
