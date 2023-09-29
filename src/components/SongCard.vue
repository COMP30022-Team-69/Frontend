<template>
  <v-card class="mb-2" draggable="true" @dragstart="handleDragStart" @dragend="handleDragEnd">
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
  },
  methods: {
    handleDragStart(event) {
      // Store the song data in the drag event's dataTransfer object
      event.dataTransfer.setData('text/plain', JSON.stringify(this.song));
      // Optionally, you can add visual feedback for the drag action
      event.target.style.opacity = '0.5';
    },
    handleDragEnd(event) {
      // Reset any visual feedback
      event.target.style.opacity = '1';
    }
  }
};
</script>


<style scoped>
/* Add any specific styles for the song card here */
[draggable] {
  cursor: move;
}
</style>
