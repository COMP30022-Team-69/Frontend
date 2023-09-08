<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12" md="3">
        <!-- Sidebar component -->
        <Sidebar :playlists="Object.keys(playlists)" @select="selectPlaylist" />
      </v-col>

      <v-col cols="12" md="9">
        <div v-if="selectedPlaylist !== null">
          <h2>{{ selectedPlaylist }}</h2>
          <SongCard v-for="song in playlists[selectedPlaylist].songs" :key="song.id" :song="song" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import SongCard from "@/components/SongCard.vue";

export default {
  components: {
    Sidebar,
    SongCard
  },
  data() {
    return {
      playlists: {
        'Favourite': {
          name: 'Favourite',
          songs: [
            { id: 1, title: 'Song A', artist: 'Artist A' },
            { id: 2, title: 'Song B', artist: 'Artist B' },
            // ... other songs
          ]
        },
        'Background': {
          name: 'Background',
          songs: [
            { id: 3, title: 'Song C', artist: 'Artist C' },
            // ... other songs
          ]
        },
        // ... other categories like 'Relax', 'Sleep', etc.
      },
      selectedPlaylist: null
    };
  },
  methods: {
    selectPlaylist(index) {
      const playlistNames = Object.keys(this.playlists);
      this.selectedPlaylist = playlistNames[index];
    },
    // ... other methods, like logout (if you have them)
  }
};
</script>

<style scoped>
/* Add any specific styles for the Home view here */
</style>
