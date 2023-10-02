<template>
  <div class="hidden lg:block lg:w-2/5 px-4 py-2">
    <!-- Tweet search input -->
    <div class="relative mb-5">
      <input
        placeholder="트위터 검색"
        type="text"
        class="pl-10 rounded-full w-full p-2 bg-gray-200 text-sm focus:ring-1 focus:ring-primary focus:bg-white focus:outline-none"
      />
      <i class="fas fa-search absolute left-0 mt-3 ml-3 text-sm text-light"></i>
    </div>
    <!-- trend for me -->
    <div class="w-full rounded-full bg-gray-50 flex flex-col">
      <div
        class="flex items-center justify-between px-3 py-1 border-b border-gray-200"
      >
        <span class="text-lg font-bold">나를 위한 트렌드</span>
        <i
          class="text-center fas fa-cog text-lg text-primary hover:bg-blue-50 p-2 rounded-full"
        ></i>
      </div>
      <div
        class="cursor-pointer border-b border-gray-200 hover:bg-gray-100 px-4 py-2"
        v-for="trend in 3"
        :key="trend"
      >
        <div class="flex">
          <div class="flex-1 flex flex-col">
            <div class="text-gray-500 text-sm">대한민국 트렌드 중</div>
            <div class="font-bold text-md">러블리즈</div>
            <div class="text-gray-500 text-sm">3,564 트윗</div>
          </div>
          <i class="fas fa-ellipsis-h text-gray-500"></i>
        </div>
      </div>
      <div class="px-4 py-2 hover:bg-gray-100">
        <span class="text-primary text-lg rounded-xl">더보기</span>
      </div>
    </div>
    <!-- follow recommneds -->
    <div class="mt-3 w-full rounded-full bg-gray-50 flex flex-col">
      <div class="px-3 py-3 border-b border-gray-200">
        <span class="text-lg font-bold">팔로우 추천</span>
      </div>
      <div
        class="cursor-pointer border-b border-gray-200 hover:bg-gray-100 px-4 py-2"
        v-for="trend in 3"
        :key="trend"
      >
        <div class="flex items-center">
          <div>
            <img
              src="http://picsum.photos/200"
              class="w-12 h-12 rounded-full mr-2"
            />
          </div>
          <div class="flex-1 flex flex-col">
            <div class="font-bold text-sm">이자경</div>
            <div class="text-gray-500 text-xs">@frineds</div>
          </div>
          <div>
            <button
              class="border-2 border-primary hover:bg-blue-100 px-4 py-1 rounded-full text-primary text-sm"
            >
              팔로우
            </button>
          </div>
        </div>
      </div>
      <div class="px-4 py-2 hover:bg-gray-100">
        <span class="text-primary text-lg rounded-xl">더보기</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
