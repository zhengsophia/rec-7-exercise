import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const suppressedUsers = ref<Array<string>>([]);

    const resetSuppressed = async () => {
      suppressedUsers.value = [];
    };

    const suppressUser = async (username: string) => {
      try {
        await fetchy(`/api/suppression/${username}`, "POST");
      } catch {
        return;
      }
      await updateSuppressedUsers();
    };

    const unsuppressUser = async (username: string) => {
      // TODO 5: Implement this function. Hint: take a look at suppressUser.
    };

    const updateSuppressedUsers = async () => {
      let suppressedUsersResults;
      try {
        suppressedUsersResults = await fetchy("/api/suppression", "GET");
        suppressedUsers.value = suppressedUsersResults;
      } catch (_) {
        suppressedUsers.value = [];
      }
      suppressedUsers.value = suppressedUsersResults;
    };

    return {
      suppressedUsers,
      suppressUser,
      unsuppressUser,
      updateSuppressedUsers,
      resetSuppressed,
    };
  },
  { persist: true },
);
