<template>
  <!-- tweets -->
  <div
    class="flex px-3 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
  >
    <img
      src="http://picsum.photos/200"
      class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
    />
    <div class="ml-3 flex-1 flex flex-col space-y-1">
      <div class="text-sm space-x-1">
        <span class="font-bold">자경</span>
        <span class="text-gray-500 text-xs">@ljk4268</span>
        <span>·</span>
        <span class="text-gray-400 text-xs">7분</span>
      </div>
      <!-- tweet body -->
      <div>
        문서를 작성할 때나 인터넷에서 글자를 입력할 때 가운데 점( · )을 입력해야
        하는 경우, 아래한글에서는 CTRL+F10 을 눌러 특수문자에서 찾으면 되지만,
        기호가 바로 눈에 보이는 것도 은근 귀찮은 작업이에요
      </div>
      <!-- tweet actions -->
      <div class="flex justify-between">
        <div class="text-gray-500 hover:text-primary">
          <i class="far fa-comment hover:bg-blue-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">11</span>
        </div>
        <div class="text-gray-500 hover:text-green-500">
          <i class="fa-solid fa-retweet hover:bg-green-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">11</span>
        </div>
        <div class="text-gray-500 hover:text-red-500">
          <i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">11</span>
        </div>
        <div class="text-gray-500 hover:text-primary">
          <i class="far fa-share-square hover:bg-blue-50 rounded-full p-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
