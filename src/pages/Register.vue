<template>
  <div class="flex flex-col items-center space-y-4 mt-10">
    <i
      class="fab fa-twitter text-4xl text-primary"
      :class="loading ? 'animate-bounce' : ''"
    ></i>
    <span class="text-2xl font-bold">뜨위떠 회원가입</span>
    <input
      v-model="username"
      type="text"
      class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
      placeholder="아이디"
    />
    <input
      v-model="email"
      type="text"
      class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
      placeholder="이메일"
    />
    <input
      @keyup.enter="onRegister"
      v-model="password"
      type="password"
      class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
      placeholder="비밀번호"
    />
    <button
      @click="onRegister"
      class="w-96 rounded text-white py-3"
      :class="loading ? 'bg-light' : 'bg-primary  hover:bg-dark'"
    >
      {{ loading ? '회원가입 중입니다.' : '회원가입' }}
    </button>
    <router-link to="/login">
      <button class="text-primary">계정이 이미 있으신가요? 로그인 하기</button>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth, db, USER_COLLECTION } from '../firebase/index.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"; 
import { useRouter } from 'vue-router'

export default {
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const router = useRouter()

    const onRegister = async () => {
      if (!email.value || !password.value || !username.value) {
        alert('아이디 이메일 비밀번호를 입력해주세요.')
      }
      try {
        loading.value = true
        const credential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        )
        const user = credential.user
        const userDoc = doc(USER_COLLECTION, user.uid)
        await setDoc(userDoc, {
          uid: user.uid,
          email: email.value,
          username: username.value,
          profile_image_url: '/profile.jpeg',
          num_tweets: 0,
          followers: [],
          followings: [],
          created_at: Date.now(),
        })
        alert('회원가입에 성공하셨습니다. 로그인 해주세요.')
        router.push('/login')
      } catch (err) {
        console.log(err);
        switch (err.code) {
          case 'auth/invalid-email':
            alert('이메일을 바르게 입력해주세요.')
            break
          case 'auth/weak-password':
            alert('비밀번호가 너무 쉬워요.')
            break
          case 'auth/email-already-in-use':
            alert('등록된 이메일 입니다.')
            break
          default:
            alert('회원가입 실패')
            break
        }
      } finally {
        loading.value = false
      }
    }
    return {
      username,
      email,
      password,
      loading,
      onRegister,
    }
  },
}
</script>

<style lang="scss" scoped></style>
