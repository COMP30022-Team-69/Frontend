<template>
  <v-card class="mb-2">
    <v-card-title>{{ song.title }}</v-card-title>
    <v-card-subtitle>{{ song.artist }}</v-card-subtitle>
    <!-- You can add more details or actions for each song here -->
  </v-card>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* Add any specific styles for the song card here */
</style>
