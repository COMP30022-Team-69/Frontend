<template>
  <v-app-bar app>
    <v-toolbar-title>
      <v-btn icon="mdi-menu" @click="openSidebar" v-if="showMenuButton"/>
      MUSIC LIBRARY
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-avatar @click="gotoUserProfile">
      <v-img src="@/assets/logo.png" alt="User"/>
    </v-avatar>
    <v-btn @click="logout">Log Out</v-btn>
  </v-app-bar>
</template>

<script>
import Cookies from "js-cookie";
import {store} from "@/store";

export default {
  components: {},
  data() {
    return {
      showMenuButton: true
    };
  },
  methods: {
    openSidebar(){
      store.state.isMobile = !store.state.isMobile;
    },
    gotoUserProfile() {
      this.$router.push({path: '/user',})
    },
    logout() {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      store.state.user = {
        status: false,
        data: {},
        token: {},
      }
      this.$router.push({path: '/login',})
    }
  },
  watch:{
    $route(to,from) {
      this.showMenuButton = !(to.path === "/admin/song" || to.path === "/admin/user");
    }
  }
};
</script>

<style scoped>

</style>
