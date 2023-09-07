<template>
  <v-app-bar app>
    <v-toolbar-title>MUSIC LIBRARY</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-avatar  @click="gotoUserProfile">
        <v-img src="@/assets/logo.png" alt="User"/>
    </v-avatar>
    <v-btn @click="logout" >Log Out</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {

    };
  },
  methods: {
    gotoUserProfile(){
      this.$router.push({path: '/user',})
    },
    logout(){
      this.$router.push({path: '/login',})
    }
  },
};
</script>

<style scoped>

</style>
