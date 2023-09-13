<template>
  <v-layout class="register">
    <v-row class="d-flex justify-center">
      <v-col cols="4">
        <RegisterForm class="register_box"/>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  components: {
    RegisterForm
  },
};
</script>

<style scoped>
.register_box {
  width: 500px;
  height: 520px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.register {
  width: 100%;
  min-height: 100vh;
  background: url("public/register-bg.svg") center center no-repeat; /* You can use a different background or keep it consistent with the login page */
  background-size: cover;
  overflow: auto;
}
</style>
