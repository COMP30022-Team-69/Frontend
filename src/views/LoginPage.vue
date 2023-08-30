<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-label text="Username"/>
          <v-input v-model="username"/>
        </v-row>
        <v-row>
          <v-label text="Password"/>
          <v-input v-model="password" type="password"/>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  </template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        // 登录
      } catch (error) {
      }
    },
  },
};
</script>

<style>
/*暂时随便填的*/
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #69b2ff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
