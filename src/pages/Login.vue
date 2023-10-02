<template>
  <div class="flex flex-col items-center space-y-4 mt-10">
    <i
      class="fab fa-twitter text-4xl text-primary"
      :class="loading ? 'animate-bounce' : ''"
    ></i>
    <span class="text-2xl font-bold">뜨위떠 로그인</span>
    <input
      v-model="email"
      type="text"
      class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
      placeholder="이메일"
    />
    <input
      @keyup.enter="onLogin"
      v-model="password"
      type="password"
      class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
      placeholder="비밀번호"
    />
    <button
      @click="onLogin"
      class="w-96 rounded text-white py-3"
      :class="loading ? 'bg-light' : 'bg-primary hover:bg-dark'"
    >
      {{ loading ? '로그인 중입니다.' : '로그인' }}
    </button>
    <router-link to="/register">
      <button class="text-primary">계정이 없으신가요? 회원가입 하기</button>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth, db } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const router = useRouter()

    const onLogin = async () => {
      if (!email.value || !password.value ) {
        alert('아이디 이메일 입력해주세요.')
      }
      try {
        loading.value = true
        const { user } = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        )
        console.log(user);
        // get user info
        const USER_COLLECTION = doc(db, "users")
        // const docSnap = await getDoc(USER_COLLECTION)
        console.log(USER_COLLECTION);
        router.replace('/')
      } catch (error) {
        console.log(error);
        alert('이메일, 비밀번호를 다시 확인해주세요.')
      } finally {
        loading.value = false
      }
    }
    return {
      email,
      password,
      loading,
      onLogin,
    }
  },
}
</script>

<style lang="scss" scoped></style>
