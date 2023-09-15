<template>
  <v-card
    class="mx-auto pa-12 pb-8"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <v-row class="d-flex justify-center mb-5">
      <v-img src="public/undraw_register.svg" max-width="100"></v-img>
    </v-row>

    <div class="text-subtitle-1 text-medium-emphasis">Create an Account</div>

    <!-- Error Message -->
    <v-alert v-if="errorMessage" type="error" dense>
      {{ errorMessage }}
    </v-alert>

    <!-- Success Message -->
    <v-alert v-if="successMessage" type="success" dense>
      {{ successMessage }}
    </v-alert>

    <v-text-field
      v-model="email"
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[rules.required, rules.email]"
    ></v-text-field>

    <v-text-field
      v-model="username"
      density="compact"
      placeholder="Username"
      prepend-inner-icon="mdi-account-outline"
      variant="outlined"
      :rules="[rules.required]"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      :error="!passwordMatch"
      :error-messages="!passwordMatch ? 'Passwords do not match' : ''"
      :rules="[rules.required, rules.counter]"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-text-field
      v-model="rePassword"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      :rules="[rules.required, rules.counter]"
      :error="!passwordMatch"
      :error-messages="!passwordMatch ? 'Passwords do not match' : ''"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-btn
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      @click="register"
    >
      Register
    </v-btn>

    <v-card-text class="text-center">
      <a
        class="text-blue text-decoration-none"
        href="#"
        @click.prevent="goToLogin"
      >
        Already have an account? Log In
      </a>
    </v-card-text>
  </v-card>
</template>

<script>
import axiosInstance from '@/js/axios';
import user from "@/js/user";

export default {
  data() {
    return {
      visible: false,
      passwordMatch: true,
      email: '',
      username: '',
      password: '',
      rePassword: '',
      errorMessage: '',
      successMessage: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 8 || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      }
    };
  },
  methods: {
    async register() {
      console.log("Register method triggered");
      try {
        const userData = {
          email: this.email,
          username: this.username,
          password: this.password,
        };
        user.register(userData, res=>{
          res.data.data
          console.log(res.data.data)
        });

        // Clear any previous error message
        this.errorMessage = '';

        // Set the success message
        this.successMessage = 'Registration successful! You can now log in.';

        // Optionally, redirect to login after a short delay
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        // console.error(error);

        // Clear any previous success message
        this.successMessage = '';

        // Set the error message based on the error received or a generic message
        this.errorMessage = 'Registration failed. Please try again.';
      }
    },
    goToLogin() {
      this.$router.push('/login'); // Navigate back to the login page
    },
  },
  watch: {
    "password":{
      handler: function (val, oldVal) {
        this.passwordMatch = val === this.rePassword;
      },
      deep: true
    },
    "rePassword":{
      handler: function (val, oldVal) {
        this.passwordMatch = val === this.password;
      },
      deep: true
    },
  }
};
</script>

<style scoped>
/* You can style the register form similarly to your login form or add custom styles */
</style>
