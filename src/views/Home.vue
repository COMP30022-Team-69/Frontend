<template>
    <v-container class="mt-4">
      <v-row>
        <v-col cols="12" md="3">
          <v-list>
            <v-list-item v-for="(playlist, index) in playlists" :key="index" @click="selectPlaylist(index)">
              <v-list-item-title>{{ playlist }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="8">
          <!-- Content of the selected playlist -->
          <v-card v-if="selectedPlaylist !== null">
            <v-card-title>{{ playlists[selectedPlaylist] }}</v-card-title>
            <!-- Display songs and other content related to the selected playlist -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      playlists: ['Favourite', 'Background', 'Relax', 'Sleep'],
      selectedPlaylist: null,
    };
  },
  methods: {
    selectPlaylist(index) {
      this.selectedPlaylist = index;
    },
    logout() {
      // log out to the login page
    },
  },
};
</script>

<style>
</style>
