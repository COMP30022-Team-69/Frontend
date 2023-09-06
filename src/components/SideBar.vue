<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item v-for="(playlist, index) in playlists" :key="index" @click="selectPlaylist(index)">
        <v-list-item-title>{{ playlist }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    playlists: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectPlaylist(index) {
      this.$emit('select', index);
    }
  }
};
</script>

<style scoped>
/* Add any specific styles for the sidebar here */
</style>
