<template>
  <section :class="`${routeName == 'home' ? '' : 'main'}`" v-if="loadPage">
    <PageLayout v-if="routeName == 'home'"></PageLayout>
    <AdminLayout v-else></AdminLayout>
    <div class="body">
      <RouterView :class="`${routeName == 'home' ? '' : 'admin-body'}`"></RouterView>
    </div>
  </section>
  <div v-else>
    <LoadPageLayout></LoadPageLayout>
  </div>
</template>

<script setup>
import PageLayout from "@/app/views/layouts/PageLayout.vue";
import AdminLayout from "@/app/views/layouts/AdminLayout.vue";
import LoadPageLayout from "@/app/views/layouts/LoadPageLayout.vue";
import { PersonalInformation } from '@/helpers/colectionNames'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthUser } from '@/stores/auth.js'
import { useLoadPage } from '@/stores/page'
import { getOne } from '@/services/QueryService'
import { signOut } from "firebase/auth";
import { auth } from '@/config/Firebase'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'


// Router -------------------------------
const route = useRoute()

// Variables -----------------------------
const routeName = ref(route.name)

// Watch -------------------------------
watch(() => route.name, (newName, oldName) => {
  routeName.value = newName
}, { deep: true });

//  Store Pinia -----------------------------
const authStore = useAuthUser()
const pageStore = useLoadPage()
const { loadPage } = storeToRefs(pageStore)
const { addLoadPageState } = pageStore
const { addUserState } = authStore



// Load Page - First step before middleware--
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
