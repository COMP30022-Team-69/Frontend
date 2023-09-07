<template>
  <v-app app>
    <div>
      <Appbar v-if="showAppBar"></Appbar>
      <router-view :class="showAppBar ? 'mt-15' : ''"/>
    </div>
  </v-app>
</template>

<script>
  import Appbar from "@/components/Appbar.vue";

  export default {
    components: {
      Appbar
    },
    data() {
      return {
        showAppBar: true
      };
    },
    methods: {

    },
    created() {

    },
    watch: {
      $route(to,from) {
          this.showAppBar = !(to.path === "/user" || to.path === "/login");
      }
    }
  };
</script>
