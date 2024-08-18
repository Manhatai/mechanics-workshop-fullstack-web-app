<template>
  <div class="modal-bg" @click.self="close">
    <div class="modal">
      <button @click="close" class="btn-close">X</button>
      <form @submit.prevent="add">
        <label for="firstName">First Name</label>
        <input type="text" v-model="newClient.firstName" id="firstName" />

        <label for="lastName">Last Name</label>
        <input type="text" v-model="newClient.lastName" id="lastName" />

        <label for="email">Email</label>
        <input type="email" v-model="newClient.email" id="email" />

        <label for="phone">Phone</label>
        <input type="text" v-model="newClient.phone" id="phone" />

        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newClient: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    add() {
      this.$emit("add", this.newClient);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: white;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
}
</style>
