<template>
  <v-snackbar v-model="$store.state.SnackBar.snackbar" :timeout="$store.state.SnackBar.timeout">
    {{ $store.state.SnackBar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="$store.state.SnackBar.snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>
