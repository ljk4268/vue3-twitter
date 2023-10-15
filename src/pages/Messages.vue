<template>
  <div class="flex-1 flex">
    <!-- chat list -->
    <div class="w-2/5 border-r border-gray-200 overflow-y-auto">
      <div class="flex flex-col">
        <div class="p-3 h-14 font-bold text-lg border-b border-gray-200">
          쪽지
        </div>
        <!-- a user list -->

        <div
          @click="onSelectedUser(user)"
          class="flex items-center cursor-pointer px-3 py-4 hover:bg-gray-50 border-b border-gray-200"
          v-for="user in users"
          :key="user.id"
        >
          <img
            :src="user.profile_image_url"
            class="w-10 h-10 rounded-full cursor-pointer mr-2"
          />
          <div class="flex space-x-2">
            <div class="font-bold">{{ user.email }}</div>
            <div class="text-gray-500">@{{ user.username }}</div>
            <div class="text-gray-500">
              {{ moment(user.created_at).format("M월 DD일") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- chatting -->
    <div class="w-3/5 border-r border-gray-200">
      <div class="flex flex-col h-screen">
        <!-- title -->
        <div class="flex px-3 h-14 items-center border-b border-gray-200">
          <img
            src="http://picsum.photos/200"
            class="w-8 h-8 rounded-full mr-2 cursor-pointer"
          />
          <div>
            <div class="font-bold text-lg">ljk4268@test.com</div>
            <div class="text-sm text-gray-500">@ljk4268</div>
          </div>
        </div>
        <!-- user info -->
        <div
          class="flex flex-col justify-center items-center border-b border-gray-200 py-6"
        >
          <div>
            <span class="font-bold mr-1">jinsyu.com</span>
            <span class="text-gray-500">@jinsyu</span>
          </div>
          <div>
            <span class="font-bold mr-1">28</span
            ><span class="text-gray-500">팔로우 중</span>
            <span class="font-bold ml-3 mr-1">7</span
            ><span class="text-gray-500">팔로워</span>
          </div>
          <div>
            <span class="text-gray-500 mr-1">가입일</span>
            <span class="text-gray-500">2011년 10월</span>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto">
          <!-- chat bubble -->
          <div class="text-right px-3 py-3">
            <span class="bg-primary text-white px-4 py-2 text-lg rounded-full"
              >메시지</span
            >
            <div class="mt-2 text-xs text-gray-500">
              2021년 1월 29일 오전 1:05
            </div>
          </div>
          <!-- chat bubble : opponent chat -->
          <div class="text-left px-3 py-3" v-for="chat in 5" :key="chat">
            <span class="bg-gray-50 px-4 py-2 text-lg rounded-full"
              >메시지</span
            >
            <div class="mt-2 text-xs text-gray-500">
              2021년 1월 29일 오전 1:05
            </div>
          </div>
        </div>
        <!-- chat input -->
        <div class="flex items-center bg-white border-t border-gray-200 sticky">
          <input
            v-model="messageBody"
            type="text"
            placeholder="새 쪽지 작성하기"
            class="m-2 py-1 px-4 rounded-full bg-gray-200 resize-none outline-none flex-1"
          />
          <button class="text-center" @click="onSendMessage">
            <i
              class="far fa-paper-plane text-primary text-lg hover:bg-blue-50 p-2 rounded-full w-10 h-10"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  query,
  orderBy,
  getDocs,
  doc,
  setDoc,
  where,
} from "firebase/firestore";
import { MESSAGE_COLLECTION, USER_COLLECTION } from "@/firebase";
import { computed, onBeforeMount, ref } from "vue";
import store from "@/store";
import moment from "moment";
export default {
  setup() {
    const currentUser = computed(() => store.state.user);
    const users = ref([]);
    const selectedUser = ref(null);
    const messageBody = ref("");
    const messages = ref([]);

    onBeforeMount(async () => {
      const userDocRef = query(USER_COLLECTION, orderBy("created_at", "desc"));
      const snapShot = await getDocs(userDocRef);
      snapShot.forEach((doc) => {
        const user = doc.data();
        if (user.email === currentUser.email) return;
        users.value.push(user);
      });
    });

    const onSelectedUser = async (user) => {
      selectedUser.value = user;

      const messageDocRef = query(
        MESSAGE_COLLECTION,
        where("from_uid", "==", currentUser.value.uid),
        where("to_uid", "==", selectedUser.value.uid),
        orderBy("created_at", "desc")
      );

      const snapShot = await getDocs(messageDocRef);
      console.log(snapShot.docs);
      messages.value = snapShot.docs.map(doc => doc.data())
    };

    const onSendMessage = async () => {
      if (!messageBody.value || !selectedUser.value) return;

      const messageDoc = doc(MESSAGE_COLLECTION);
      let message = {
        id: messageDoc.id,
        from_uid: currentUser.value.uid,
        to_uid: selectedUser.value.uid,
        messageBody: messageBody.value,
        created_at: Date.now(),
      };
      await setDoc(messageDoc, message);

      messages.value.push(message);
      messageBody.value = "";
    };

    return {
      currentUser,
      users,
      moment,
      onSelectedUser,
      onSendMessage,
      messageBody,
      messages,
    };
  },
};
</script>

<style lang="scss" scoped></style>
