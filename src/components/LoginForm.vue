<template>
  <v-card
    class="mx-auto pa-12 pb-8"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
      <v-row  class="d-flex justify-center mb-5">
        <v-img src="public/undraw_my_password_re_ydq7.svg" max-width="100"></v-img>
      </v-row>

    <div class="text-subtitle-1 text-medium-emphasis">Account</div>

    <v-text-field
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Password

      <a
        class="text-caption text-decoration-none text-blue"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Forgot login password?</a>
    </div>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <br>
    <v-btn
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
    >
      Log In
    </v-btn>

    <v-card-text class="text-center">
      <a
        class="text-blue text-decoration-none"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Browse as a guest <v-icon icon="mdi-chevron-right"></v-icon>
      </a>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        username: '',
        password: '',
      }
    },
    methods: {
      login(){}
    },
  };
</script>


<style scoped>

</style>
