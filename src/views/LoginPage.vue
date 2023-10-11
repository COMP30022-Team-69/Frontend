<template>
  <v-layout class="home">
    <v-row class="d-flex justify-center">
      <v-col cols="12" lg="4" md="4" sm="12">
        <LoginForm class="login_box"/>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
    },
  },
};
</script>

<style>
.login_box {
  width: 500px;
  height: 520px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.home {
  width: 100%;
  min-height: 100vh;
  background: url("public/bg.svg") center center no-repeat;
  background-size: cover;
  overflow: auto;
}
</style>
