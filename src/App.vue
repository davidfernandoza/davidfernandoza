<template>
  <section class="main row m-0 p-0" v-if="loadPage">
    <PageLayout></PageLayout>
    <div class="body col-9 pt-2 pb-0 ps-0 pe-4 m-0">
      <RouterView></RouterView>
    </div>
  </section>
  <div v-else>
    <LoadPageLayout></LoadPageLayout>
  </div>
</template>

<script setup>
import PageLayout from "@/components/layouts/PageLayout.vue";
import LoadPageLayout from "@/components/layouts/LoadPageLayout.vue";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/Firebase'
import { useAuthUser } from '@/stores/auth.js'
import { useLoadPage } from '@/stores/page'
import { getOne } from '@/services/QueryService'
import { signOut } from "firebase/auth";
import { storeToRefs } from 'pinia'
import { PersonalInformation } from '@/helpers/colectionNames'


//  Store Pinia -----------------------------
const authStore = useAuthUser()
const pageStore = useLoadPage()
const { loadPage } = storeToRefs(pageStore)
const { addLoadPageState } = pageStore
const { addUserState } = authStore

// Load Page -----------------------------
onAuthStateChanged(auth, userAuth => {
  setTimeout(async () => {
    addLoadPageState(false)
    if (!userAuth) {
      addLoadPageState(true)
      return null
    }
    const personalInformation = await getOne({
      model: PersonalInformation,
      key: 'userUID',
      value: userAuth.uid
    })
    if (!personalInformation) {
      await signOut(auth)
      return addLoadPageState(true)
    }
    addUserState({ ...userAuth, ...personalInformation })
    return addLoadPageState(true)
  }, 500);
})

</script>
