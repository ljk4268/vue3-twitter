<template>
  <div class="flex-1 flex" v-if="profileUser">
    <!-- profile section -->
    <div class="flex-1 flex flex-col border-r border-color">
      <!-- title -->
      <div class="px-3 py-1 flex border-b border-color">
        <button class="mr-4" @click="router.go(-1)">
          <i
            class="fas fa-arrow-left text-primary p-3 rounded-full hover:bg-blue-50"
          ></i>
        </button>
        <div>
          <div class="font-extrabold text-lg">{{ profileUser.email }}</div>
          <div class="text-xs text-gray">{{ profileUser.num_tweets }}트윗</div>
        </div>
      </div>
      <!-- Profile backgroundimage -->
      <div class="bg-gray-300 h-40 relative flex-none">
        <img
          :src="profileUser.background_image_url"
          class="w-full h-40 object-cover"
        />
        <!-- profile image -->
        <div
          class="w-28 h-28 rounded-full border-4 border-white bg-gray-200 absolute -bottom-14 left-2"
        >
          <img
            :src="profileUser.profile_image_url"
            class="rounded-full opacity-90 hover:opacity-100 cursor-pointer w-full h-full"
          />
        </div>
      </div>
      <!-- profile editbutton -->
      <div class="text-right mt-2 mr-2 h-14">
        <button
          v-if="currentUser.uid == profileUser.uid"
          @click="showProfileModal = true"
          class="border-2 text-sm border-primary text-primary px-3 py-2 hover: bg-blue-50 font-bold rounded-full"
        >
          프로필 수정
        </button>
      </div>
      <!-- user info -->
      <div class="mx-3 mt-2">
        <div class="font-extrabold text-lg">{{ profileUser.email }}</div>
        <div class="text-gray">@{{ profileUser.username }}</div>
        <div>
          <span class="text-gray">가입일:</span>
          <span class="text-gray">{{
            moment(profileUser.created_at).format('YYYY년 MM월')
          }}</span>
        </div>
        <div>
          <span class="font-bold mr-1">{{
            profileUser.followings.length
          }}</span>
          <span class="text-gray mr-3">팔로우 중</span>
          <span class="font-bold mr-1">{{ profileUser.followers.length }}</span>
          <span class="text-gray">팔로워</span>
        </div>
      </div>
      <!-- tabs -->
      <div class="flex border-b border-color mt-3">
        <div
          @click="currentTab = 'tweet'"
          :class="
            currentTab == 'tweet'
              ? 'text-primary border-b border-primary'
              : 'text-gray'
          "
          class="py-3 w-1/3 font-bold text-center hover:bg-blue-50 cursor-pointer hover:text-primary"
        >
          트윗
        </div>
        <div
          @click="currentTab = 'retweet'"
          :class="
            currentTab == 'retweet'
              ? 'text-primary border-b border-primary'
              : 'text-gray'
          "
          class="py-3 w-1/3 font-bold text-center hover:bg-blue-50 cursor-pointer hover:text-primary"
        >
          리트윗
        </div>
        <div
          @click="currentTab = 'like'"
          :class="
            currentTab == 'like'
              ? 'text-primary border-b border-primary'
              : 'text-gray'
          "
          class="py-3 w-1/3 font-bold text-center hover:bg-blue-50 cursor-pointer hover:text-primary"
        >
          좋아요
        </div>
      </div>
      <!-- tweet -->
      <div class="overflow-y-auto">
        <Tweet
          v-for="tweet in currentTab == 'tweet'
            ? tweets
            : currentTab == 'retweet'
            ? reTweets
            : likeTweets"
          :tweet="tweet"
          :currentUser="profileUser"
          :key="tweet.id"
        />
      </div>
    </div>
    <!-- trend section -->
    <Trends />
  </div>
  <ProfileEditModal
    v-if="showProfileModal"
    @close-modal="showProfileModal = false"
  />
</template>

<script>
import Trends from '@/components/Trends.vue'
import Tweet from '@/components/Tweet.vue'
import store from '@/store'
import { computed, onBeforeMount, ref } from 'vue'
import {
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  getDoc,
} from 'firebase/firestore'
import {
  LIKE_COLLECTION,
  RETWEET_COLLECTION,
  TWEET_COLLECTION,
  USER_COLLECTION,
} from '../firebase'
import getTweetInfo from '../utils/getTweetInfo'
import moment from 'moment'
import { useRoute, useRouter } from 'vue-router'
import ProfileEditModal from '@/components/ProfileEditModal.vue'

export default {
  components: { Trends, Tweet, ProfileEditModal },
  setup() {
    // 화살표함수 리턴!!
    const currentUser = computed(() => store.state.user)
    const profileUser = ref(null)
    const tweets = ref([])
    const reTweets = ref([])
    const likeTweets = ref([])
    const currentTab = ref('tweet')
    const route = useRoute()
    const router = useRouter()
    const showProfileModal = ref(false)

    onBeforeMount(() => {
      const profileUid = route.params.uid ?? currentUser.value.uid

      const userDoc = doc(USER_COLLECTION, profileUid)
      onSnapshot(query(userDoc), (doc) => {
        profileUser.value = doc.data()
      })

      onSnapshot(
        query(
          TWEET_COLLECTION,
          where('uid', '==', profileUid),
          orderBy('created_at', 'desc')
        ),
        (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            let tweet = await getTweetInfo(change.doc.data(), currentUser.value)

            if (change.type === 'added') {
              tweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              tweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              tweets.value.splice(change.oldIndex, 1)
            }
          })
        }
      )
      onSnapshot(
        query(
          RETWEET_COLLECTION,
          where('uid', '==', profileUid),
          orderBy('created_at', 'desc')
        ),
        (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            const docRef = doc(
              TWEET_COLLECTION,
              change.doc.data().from_tweet_id
            )
            const docSnap = await getDoc(docRef)
            let tweet = await getTweetInfo(docSnap.data(), currentUser.value)

            if (change.type === 'added') {
              reTweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              reTweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              reTweets.value.splice(change.oldIndex, 1)
            }
          })
        }
      )
      onSnapshot(
        query(
          LIKE_COLLECTION,
          where('uid', '==', profileUid),
          orderBy('created_at', 'desc')
        ),
        (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            const docRef = doc(
              TWEET_COLLECTION,
              change.doc.data().from_tweet_id
            )
            const docSnap = await getDoc(docRef)
            let tweet = await getTweetInfo(docSnap.data(), currentUser.value)

            if (change.type === 'added') {
              likeTweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              likeTweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              likeTweets.value.splice(change.oldIndex, 1)
            }
          })
        }
      )
    })

    return {
      currentUser,
      tweets,
      moment,
      currentTab,
      reTweets,
      likeTweets,
      profileUser,
      router,
      showProfileModal,
    }
  },
}
</script>

<style lang="scss" scoped></style>
