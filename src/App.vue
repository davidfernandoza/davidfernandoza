<template>
  <section class="main row m-0 p-0">
    <!-- <AdminLayout class="col-3 p-0 m-0"></AdminLayout> -->
    <PageLayout></PageLayout>
    <div class="body col-9 pt-2 pb-0 ps-0 pe-4 m-0">
      <!-- <RouterView></RouterView> -->
    </div>
  </section>
</template>

<script setup>
import AdminLayout from "@/components/layouts/AdminLayout.vue";
import PageLayout from "@/components/layouts/PageLayout.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// colocarlo en pinia
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log({ 'register': user });
  } else {
    console.log('none');
  }
});

const user = auth.currentUser
console.log({ user })
</script>
