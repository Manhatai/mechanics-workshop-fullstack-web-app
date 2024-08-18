<template>
  <div class="modal-bg" @click.self="close">
    <div class="modal">
      <button @click="close" class="btn-close">X</button>
      <form @submit.prevent="add">
        <label for="date">Date</label>
        <input type="text" v-model="newBooking.date" id="date" />

        <label for="hour">Hour</label>
        <input type="text" v-model="newBooking.hour" id="hour" />

        <label for="clientID">Client ID</label>
        <input type="number" v-model="newBooking.clientID" id="clientID" />

        <label for="carID">Car ID</label>
        <input type="number" v-model="newBooking.carID" id="carID" />

        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBooking: {
        date: "",
        hour: "",
        clientID: null,
        carID: null,
      },
    };
  },
  methods: {
    add() {
      this.$emit("add", this.newBooking);
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
