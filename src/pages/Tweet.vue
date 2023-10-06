<template>
  <div class="flex-1 flex">
    <div class="flex-1 border-r border-gray-200">
      <div class="flex flex-col">
        <!-- title -->
        <div class="flex items-center px-3 py-2 border-b border-gray-200">
          <button @click="router.go(-1)" class="text-primary text-lg ml-3 hover:bg-blue-50 p-2 rounded-full h-10 w-10">
            <i
              class="fas fa-arrow-left"
            ></i>
          </button>
          <span class="font-bold text-lg ml-10">트윗</span>
        </div>

        <!-- tweet -->
        <div class="p-3 flex">
          <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer">
          <div class="ml-3">
            <div class="font-bold">이메일</div>
            <div class="text-gray text-sm">@id</div>
          </div>
          <div class="p-3">테스트 ㅈ</div>
        </div>
      </div>
    </div>
  </div>
  <Trends />
</template>

<script>
import Trends from "@/components/Trends.vue";
import router from "@/router";
export default {
  components: { Trends },
  setup() {
    return {
      router
    }
  },
};
</script>

<style lang="scss" scoped></style>
