<template>
  <div class="flex-1 border-r border-gray-100 flex flex-col overflow-y-auto">
    <!-- title -->
    <div class="p-3 font-bold text-lg border-b border-gray-100">알림</div>
    <!-- notifications -->
    <div
      class="space-y-2 border-b border-gray-200 cursor-pointer px-2 py-1"
      v-for="notification in 10"
      :key="notification"
    >
      <div class="flex justify-between">
        <img
          src="http://picsum.photos/100"
          class="w-10 h-10 rounded-full hover:opacity-80"
        />
        <i
          class="fas fa-ellipsis-h text-gray-500 hover:bg-blue-50 hover:text-primary p-2 rounded-full w-10 h-10 flex items-center justify-center"
        ></i>
      </div>
      <div><span class="font-bold">이자경</span>님의 최근 트윗</div>
      <div class="text-gray-500">
        문서를 작성할 때나 인터넷에서 글자를 입력할 때 가운데 점( · )을 입력해야
        하는 경우, 아래한글에서는 CTRL+F10 을 눌러 특수문자에서 찾으면 되지만,
        기호가 바로 눈에 보이는 것도 은근 귀찮은 작업이에요
      </div>
    </div>
  </div>

  <!-- trend part -->
  <Trends />
</template>

<script setup>
import Trends from '../components/Trends.vue'

</script>

<style lang="scss" scoped></style>
