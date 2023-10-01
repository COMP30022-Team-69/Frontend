<template>
  <v-card class="mb-2" draggable="true" @dragstart="handleDragStart" @dragend="handleDragEnd">
    <v-card-title>{{ song.name }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          Author: {{song.author}}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          {{song.description}}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {store} from "@/store";

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
      event.target.style.opacity = '0.3';
      store.state.dragStarted = true
    },
    handleDragEnd(event) {
      // Reset any visual feedback
      event.target.style.opacity = '1';
      store.state.dragStarted = false
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
