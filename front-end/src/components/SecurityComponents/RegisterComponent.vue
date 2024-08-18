<template>
  <div class="login-container">
    <div class="login-box">
      <form class="login-form" @submit.prevent="login">
        <label for="username" class="label-username">Username</label>
        <input
          type="text"
          id="username"
          class="input-username"
          v-model="username"
        />

        <label for="password" class="label-password">Password</label>
        <input
          type="password"
          id="password"
          class="input-password"
          v-model="password"
        />

        <button type="submit">Register</button>
      </form>
    </div>
  </div>
  <div v-if="isCorrect" class="login-com">Register successful</div>
  <div v-if="!isCorrect && loginAttempted" class="login-com"
    >Register failed</div
  >
</template>

<script>
import apiClient from "../axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      isCorrect: false,
      loginAttempted: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post(
          "/workshop/Authorization/register",
          {
            username: this.username,
            password: this.password,
          }
        );

        const token = response.data;
        localStorage.setItem("authToken", token);
        this.isCorrect = true;
        console.log(this.isCorrect);
      } catch (error) {
        console.error("Login failed:", error);
        this.isCorrect = false;
        this.loginAttempted = true;
        console.log(this.isCorrect);
      }
    },
  },
};
</script>

<style>
label {
  margin-top: 0px;
}

.login-container {
  display: flex;
  justify-content: center;
}

.login-box {
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  height: 250px;
  width: 250px;
  border-radius: 5px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.label-password {
  margin-top: 10px;
}

.input-username,
.input-password {
  margin-bottom: 10px;
  padding: 5px;
}

.login-com {
  padding-top: 10px;
  text-align: center;
}
</style>
