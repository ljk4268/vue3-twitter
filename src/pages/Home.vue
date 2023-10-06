<template>
  <!-- main part -->
  <div class="flex-1 border-r border-gray-200 overflow-y-auto">
    <div class="flex flex-col">
      <!-- title -->
      <div class="border-b border-gray-200 px-3 py-2 font-bold text-lg">홈</div>
      <!-- tweeting section -->
      <div class="flex px-3 py-3 border-b-8 border-gray-200">
        <img
          :src="currentUser.profile_image_url"
          class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
        />
        <div class="ml-2 flex-1 flex flex-col">
          <textarea
            v-model="tweetBody"
            placeholder="무슨 일이 일어나고 있나요?"
            class="w-full text-lg font-bold focus:outline-none mb-3 resize-none"
          ></textarea>
          <div class="text-right">
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
      <!-- tweets -->
      <Tweet
        v-for="tweet in tweets"
        :key="tweet.id"
        :tweet="tweet"
        :currentUser="currentUser"
      />
    </div>
  </div>
  <!-- trend part -->
  <Trends />
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
import Trends from "../components/Trends.vue";
import Tweet from "@/components/Tweet.vue";
import store from "@/store";
import { doc, onSnapshot, query, getDoc, orderBy } from "firebase/firestore";
import { TWEET_COLLECTION, USER_COLLECTION } from "../firebase";
import addTweet from "../utils/addTweet";
import getTweetInfo from "../utils/getTweetInfo";

export default {
  components: {
    Trends,
    Tweet,
  },
  setup() {
    const tweets = ref([]);
    const tweetBody = ref("");
    const currentUser = computed(() => store.state.user);

    onBeforeMount(() => {
      onSnapshot(
        query(TWEET_COLLECTION, orderBy("created_at", "desc")),
        (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            let tweet = await getTweetInfo(
              change.doc.data(),
              currentUser.value
            );

            if (change.type === "added") {
              tweets.value.splice(change.newIndex, 0, tweet);
            } else if (change.type === "modified") {
              tweets.value.splice(change.oldIndex, 1, tweet);
            } else if (change.type === "removed") {
              tweets.value.splice(change.oldIndex, 1);
            }
          });
        }
      );
    });

    const onAddTweet = async () => {
      try {
        await addTweet(tweetBody.value, currentUser.value);
        tweetBody.value = "";
      } catch (err) {
        console.log("on add tweet error on homepage: ", err);
      }
    };

    return {
      tweets,
      currentUser,
      tweetBody,
      onAddTweet,
    };
  },
};
</script>

<style lang="scss" scoped></style>
