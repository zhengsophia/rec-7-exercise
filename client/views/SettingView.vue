<script setup lang="ts">
import router from "@/router";
import { useSettingsStore } from "@/stores/settings";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import SuppressUnsuppressUserForm from "../components/Setting/SuppressUnsuppressUserForm.vue";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();
const { resetSuppressed } = useSettingsStore();

async function logout() {
  await logoutUser();
  await resetSuppressed();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1>Settings for {{ currentUsername }}</h1>
    <button class="pure-button pure-button-primary" @click="logout">Logout</button>
    <button class="button-error pure-button" @click="delete_">Delete User</button>
    <UpdateUserForm />
    <SuppressUnsuppressUserForm />
  </main>
</template>
