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
            <div class="flex items-center">
              <button
                @click="$emit('close-modal')"
                class="flex items-center justify-center fas fa-times text-primary text-xl p-2 w-10 h-10 hover:bg-blue-50 rounded-full"
              ></button>
              <span class="font-bold text-lg">프로필 수정</span>
            </div>
            <div class="text-lg mr-2">
              <button
                @click="onSaveProfile"
                class="hover:bg-dark bg-primary text-white font-bold px-3 py-1 rounded-full"
              >
                저장
              </button>
            </div>
          </div>
          <!-- image section -->
          <div class="h-60">
            <!-- background image -->
            <div
              class="bg-gray-300 h-40 relative flex-none flex items-center justify-center"
            >
              <img
                ref="backgroundImage"
                :src="currentUser.background_image_url"
                class="object-cover absolute h-full w-full"
              />
              <button
                @click="onChangeBackgroundImage"
                class="absolute h-10 w-10 hover:text-gray-200 rounded-full fas fa-camera text-white text-lg"
              ></button>
              <input
                @change="previewBackgroundImage"
                type="file"
                accept="image/*"
                id="backgroundImageInput"
                class="hidden"
              />

              <!-- profile image -->
              <img
                ref="profileImage"
                :src="currentUser.profile_image_url"
                class="border-4 border-white w-28 h-28 absolute -bottom-14 left-2 rounded-full"
              />
              <button
                @click="onChangeProfileImage"
                class="absolute -bottom-5 left-11 h-10 w-10 hover:text-gray-200 rounded-full fas fa-camera text-white text-lg"
              ></button>
              <input
                @change="previewProfileImage"
                type="file"
                accept="image/*"
                id="profileInput"
                class="hidden"
              />
            </div>
          </div>
          <div class="flex flex-col p-2">
            <div
              class="mx-2 my-1 px-2 py-1 border border-gray-200 rounded hover:text-primary hover:border-primary"
            >
              <div class="text-sm text-gray hover:text-primary">이름</div>
              <input
                type="text"
                :value="currentUser.email"
                class="text-black focus:outline-none"
              />
            </div>
            <div
              class="mx-2 my-1 px-2 py-5 border border-gray-200 rounded hover:text-primary hover:border-primary"
            >
              <input
                type="text"
                placeholder="자기소개"
                class="text-black focus:outline-none"
              />
            </div>
            <div
              class="mx-2 my-1 px-2 py-3 border border-gray-200 rounded hover:text-primary hover:border-primary"
            >
              <input
                type="text"
                placeholder="위치"
                class="text-black focus:outline-none"
              />
            </div>
            <div
              class="mx-2 my-1 px-2 py-3 border border-gray-200 rounded hover:text-primary hover:border-primary"
            >
              <input
                type="text"
                placeholder="웹사이트"
                class="text-black focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import addTweet from '../utils/addTweet'
import store from '@/store'
import { storage, USER_COLLECTION } from '@/firebase'
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'

export default {
  setup(props, { emit }) {
    const tweetBody = ref('')
    const currentUser = computed(() => store.state.user)
    const backgroundImage = ref(null)
    const profileImage = ref(null)
    const profileImageData = ref(null)
    const backgroundImageData = ref(null)

    const onAddTweet = async () => {
      try {
        await addTweet(tweetBody.value, currentUser.value)
        tweetBody.value = ''
        emit('close-modal')
      } catch (err) {
        console.log('on add tweet error on homepage: ', err)
      }
    }

    const onChangeBackgroundImage = () => {
      document.getElementById('backgroundImageInput').click()
    }
    const onChangeProfileImage = () => {
      document.getElementById('profileInput').click()
    }
    const previewBackgroundImage = (event) => {
      const file = event.target.files[0]
      backgroundImageData.value = file
      let reader = new FileReader()
      reader.onload = function (event) {
        backgroundImage.value.src = event.target.result
      }
      reader.readAsDataURL(file)
    }

    const previewProfileImage = (event) => {
      const file = event.target.files[0]
      profileImageData.value = file
      let reader = new FileReader()
      reader.onload = function (event) {
        profileImage.value.src = event.target.result
      }
      reader.readAsDataURL(file)
    }

    const onSaveProfile = () => {
      if (!profileImageData.value && !backgroundImageData.value) {
        return
      }

      if (profileImageData.value) {
        const sRef = storageRef(
          storage,
          `profile/${currentUser.value.uid}/profile`
        )
        const uploadTask = uploadBytesResumable(sRef, profileImageData.value)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(sRef).then(async (url) => {
              const userDoc = doc(USER_COLLECTION, currentUser.value.uid)
              await updateDoc(userDoc, {
                profile_image_url: url,
              })
              store.commit('SET_PROFILE_IMAGE', url)
            })
          }
        )
      }

      if (backgroundImageData.value) {
        const sRef = storageRef(
          storage,
          `profile/${currentUser.value.uid}/background`
        )
        const uploadTask = uploadBytesResumable(sRef, backgroundImageData.value)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(sRef).then(async (url) => {
              const userDoc = doc(USER_COLLECTION, currentUser.value.uid)
              await updateDoc(userDoc, {
                background_image_url: url,
              })
              store.commit('SET_BACKGROUND_IMAGE', url)
            })
          }
        )
      }

      emit('close-modal')
    }

    return {
      tweetBody,
      onAddTweet,
      currentUser,
      onChangeBackgroundImage,
      onChangeProfileImage,
      previewBackgroundImage,
      previewProfileImage,
      backgroundImage,
      profileImage,
      onSaveProfile,
      profileImageData,
      backgroundImageData,
    }
  },
}
</script>

<style lang="scss" scoped></style>
