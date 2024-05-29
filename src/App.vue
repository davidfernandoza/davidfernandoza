<template>
  <section class="main row m-0 p-0">
    <AdminLayout class="col-3 p-0 m-0"></AdminLayout>
    <div class="body col-9 pt-2 pb-0 ps-0 pe-4 m-0">
      <RouterView></RouterView>
    </div>
  </section>
</template>

<script setup>
import AdminLayout from "@/components/layouts/AdminLayout.vue";
</script>
