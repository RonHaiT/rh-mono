<script lang="ts" setup>
import { useAntdStore } from "@/stores/antd";
const antdStore = useAntdStore();
const gradientStyle = {
  backgroundImage:
    "linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)",
  height: "4px",
  width: "100%",
};
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<template>
  <div class="w-full h-screen flex justify-center items-center bg-gray-200">
    <div class="bg-ayer bg-[#f0f2f5]" :style="gradientStyle"></div>
    <div class="content-layer w-full h-full flex justify-center items-center">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="w-1/3 h-1/2 bg-white rounded-lg shadow-md flex flex-col justify-center items-center"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 0, span: 24 }">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 0, span: 24 }" class="flex">
          <a-button type="primary" html-type="submit">登录</a-button>
          <a-button type="primary" html-type="submit" @click="$router.push('/')"
            >返回首页</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
