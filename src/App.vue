<template>
  <div class="flex h-screen">
    <div class="w-1/4 mt-5 ml-10 flex flex-col justify-between">
      <div>
        <!-- twitter logo -->
        <i class="fa-brands fa-twitter text-3xl text-primary ml-4"></i>
        <!-- twitter sidemenu icons -->
        <div class="flex flex-col items-start">
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <i class="fa-solid fa-house-chimney-user fa-fw text-2xl"></i>
            <span class="ml-5 text-lg">홈</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <i class="fa-solid fa-hashtag fa-fw text-2xl"></i>
            <span class="ml-5 text-lg">탐색하기</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <i class="fa-solid fa-bell fa-fw text-2xl"></i>
            <span class="ml-5 text-lg">알림</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <i class="fa-solid fa-envelope fa-fw text-2xl"></i>
            <span class="ml-5 text-lg">쪽지</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <i class="fa-solid fa-bookmark fa-fw text-2xl"></i>
            <span class="ml-5 text-lg">북마크</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <i class="fa-solid fa-list-alt fa-fw text-2xl"></i>
            <span class="ml-5 text-lg">리스트</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <i class="fa-solid fa-user fa-fw text-2xl"></i>
            <span class="ml-5 text-lg">프로필</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <i class="fa-solid fa-ellipsis-h fa-fw text-2xl"></i>
            <span class="ml-5 text-lg">더보기</span>
          </div>
        </div>
        <!-- twitter button -->
        <div class="mr-3">
          <button
            class="mt-3 bg-primary text-white w-full h-12 rounded-full hover:bg-dark"
          >
            Tweet
          </button>
        </div>
      </div>
      <div>
        <!-- profile button -->
        <div class="mr-3 mb-3">
          <button
            class="mt-3 px-2 py-1 w-full h-12 rounded-full hover:bg-blue-50 flex items-center"
          >
            <img src="http://picsum.photos/100" class="w-10 rounded-full"/>
            <div class="ml-2">
              <div class="text-sm font-bold">jinsyn.com</div>
              <div class="text-xs text-gray-500 text-left">@jinsyn</div>
            </div>
            <i class="ml-auto fa-solid fa-ellipsis-h fa-fw text-xs"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="flex-1 bg-red-200"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
