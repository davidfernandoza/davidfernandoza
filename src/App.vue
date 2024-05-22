<template>
  <section class="main row m-0 p-0">
    <AdminLayout></AdminLayout>
    <div class="body col-10">
      <RouterView></RouterView>
    </div>
  </section>
</template>

<script setup>
import AdminLayout from "@/components/layouts/AdminLayout.vue";
</script>
