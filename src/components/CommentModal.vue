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
                @click="onCommentTweet"
                class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full mr-3"
              >
                트윗
              </button>
            </div>
          </div>
          <div>
            <!-- original tweet -->
            <div class="flex px-4 pt-4 pb-3">
              <div class="flex flex-col">
                <img
                  src="http://picsum.photos/200"
                  class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
                />
                <div class="ml-5 w-0.5 h-full bg-gray-300 mt-2 -mb-1"></div>
              </div>
              <div class="ml-2 flex-1">
                <div class="flex space-x-2">
                  <span class="font-bold text-sm">{{ tweet.username }}</span>
                  <span class="text-gray text-sm">@{{ tweet.username }}</span>
                  <span class="text-gray text-sm">{{
                    moment(tweet.created_at).fromNow()
                  }}</span>
                </div>
                <div class="text-sm">
                  {{ tweet.tweet_body }}
                </div>
                <div class="flex">
                  <span class="text-primary text-sm"
                    >@{{ tweet.username }}
                  </span>
                  <span class="text-gray text-sm"> 님에게 보내는 답글</span>
                </div>
              </div>
            </div>
            <!-- tweeting section -->
            <div class="flex px-4 pb-4">
              <img
                :src="currentUser.profile_image_url"
                class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
              />
              <div class="ml-2 flex-1 flex flex-col">
                <textarea
                  rows="5"
                  v-model="tweetBody"
                  placeholder="내 답글을 트윗합니다."
                  class="w-full text-lg font-bold focus:outline-none mb-3 resize-none"
                ></textarea>
                <!-- tweet button -->
                <div class="text-right hidden sm:block">
                  <button
                    v-if="!tweetBody.length"
                    class="bg-light hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
                  >
                    답글
                  </button>
                  <button
                    v-else
                    @click="onCommentTweet"
                    class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
                  >
                    답글
                  </button>
                </div>
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
import moment from "moment";
import store from "@/store";
import { COMMENT_COLLECTION, TWEET_COLLECTION } from "@/firebase";
import { setDoc, doc, getDoc, updateDoc, increment } from "firebase/firestore";

export default {
  props: ["tweet"],
  setup(props, { emit }) {
    const tweetBody = ref("");
    const currentUser = computed(() => store.state.user);

    const onCommentTweet = async () => {
      try {
        const commentsDoc = doc(COMMENT_COLLECTION);
        await setDoc(commentsDoc, {
          id: commentsDoc.id,
          from_tweet_id: props.tweet.id,
          comment_tweet_body: tweetBody.value,
          user_id: currentUser.value.uid,
          created_at: Date.now(),
        });

        const tweetsDoc = doc(TWEET_COLLECTION, props.tweet.id)
        await updateDoc(tweetsDoc, {
          num_comments: increment(1),
        });
      } catch (err) {
        console.log("on comment tweet error: ",err);
      } finally {
        emit('close-modal')
      }
    };

    return {
      moment,
      tweetBody,
      onCommentTweet,
      currentUser,
    };
  },
};
</script>

<style lang="scss" scoped></style>
