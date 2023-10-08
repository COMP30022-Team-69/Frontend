<template>
  <v-app app>
    <div>
      <Appbar v-if="showAppBar"></Appbar>
      <router-view :class="showAppBar ? 'mt-15' : ''"/>
      <SnackBar/>
    </div>
  </v-app>
</template>

<script>
  import Appbar from "@/components/Appbar.vue";
  import SnackBar from "@/components/SnackBar.vue";

  export default {
    components: {
      Appbar,
      SnackBar
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
          this.showAppBar = !(to.path === "/user" || to.path === "/login"|| to.path === "/register");
      }
    }
  };
</script>
