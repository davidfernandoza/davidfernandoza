<template>
  <section class="main row m-0 p-0">
    <PageLayout></PageLayout>
    <div class="body col-9 pt-2 pb-0 ps-0 pe-4 m-0">
      <RouterView></RouterView>
    </div>
  </section>
</template>

<script setup>
import PageLayout from "@/components/layouts/PageLayout.vue";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/Firebase'
import { useAuthUser } from '@/stores/auth.js'
import { getOne } from '@/services/QueryService'
import { signOut } from "firebase/auth";


const store = useAuthUser()
const { addUserState } = store


onAuthStateChanged(auth, async userAuth => {
  if (!userAuth) return null
  let personalInformation = await getOne({
    model: 'personalInformation',
    key: 'userUID',
    value: userAuth.uid
  })
  if (!personalInformation) return await signOut(auth)
  addUserState({ ...userAuth, ...personalInformation })
})

</script>
