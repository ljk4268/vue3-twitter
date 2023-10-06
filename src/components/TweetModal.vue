<template>
  <div
    @click="$emit('close-modal')"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <!-- content -->
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        @click.stop
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg mx-auto max-sm:h-full"
      >
        <div class="bg-white">
          <div
            class="border-b border-gray-200 flex justify-between items-center"
          >
            <button
              @click="$emit('close-modal')"
              class="fas fa-times text-primary text-xl p-2 w-10 h-10 hover:bg-blue-50 rounded-full"
            ></button>
            <!-- tweet button -->
            <div class="text-right sm:hidden">
              <button
                v-if="!tweetBody.length"
                class="bg-light hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full mr-3"
              >
                트윗
              </button>
              <button
                v-else
                @click="onAddTweet"
                class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full mr-3"
              >
                트윗
              </button>
            </div>
          </div>
          <div class="flex px-3 py-3">
            <img
              :src="currentUser.profile_image_url"
              class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
            />

            <div class="ml-2 flex-1 flex flex-col">
              <textarea
                rows="5"
                v-model="tweetBody"
                placeholder="무슨 일이 일어나고 있나요?"
                class="w-full text-lg font-bold focus:outline-none mb-3 resize-none"
              ></textarea>
              <!-- tweet button -->
              <div class="text-right hidden sm:block">
                <button
                  v-if="!tweetBody.length"
                  class="bg-light hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
                >
                  트윗
                </button>
                <button
                  v-else
                  @click="onAddTweet"
                  class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
                >
                  트윗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import addTweet from "../utils/addTweet";
import store from "@/store";

export default {
  setup(props, { emit }) {
    const tweetBody = ref("");
    const currentUser = computed(() => store.state.user);

    const onAddTweet = async () => {
      try {
        await addTweet(tweetBody.value, currentUser.value);
        tweetBody.value = "";
        emit("close-modal");
      } catch (err) {
        console.log("on add tweet error on homepage: ", err);
      }
    };

    return {
      tweetBody,
      onAddTweet,
      currentUser,
    };
  },
};
</script>

<style lang="scss" scoped></style>
