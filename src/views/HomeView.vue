<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import $api from "@/app/API/axios";
$api.post("/auth/validate").then((daa) => {
  console.log(daa);
});
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
