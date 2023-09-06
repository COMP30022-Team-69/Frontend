<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12" md="3">
        <!-- Sidebar component -->
        <Sidebar :playlists="playlists" @select="selectPlaylist" />
      </v-col>

      <v-col cols="12" md="8">
        <!-- Content of the selected playlist -->
        <v-card v-if="selectedPlaylist !== null">
          <v-card-title>{{ playlists[selectedPlaylist] }}</v-card-title>
          <!-- Display songs and other content related to the selected playlist -->
          <!-- ... -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      playlists: ['Favourite', 'Background', 'Relax', 'Sleep'],
      selectedPlaylist: null
    };
  },
  methods: {
    selectPlaylist(index) {
      this.selectedPlaylist = index;
    },
    // ... other methods, like logout
  }
};
</script>

<style scoped>
/* Add any specific styles for the Home view here */

</style>
