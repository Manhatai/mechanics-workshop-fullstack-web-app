<template>
  <div class="modal-bg" @click.self="close">
    <div class="modal">
      <button @click="close" class="btn-close">X</button>
      <form @submit.prevent="save">
        <label for="brand">Brand</label>
        <input type="text" v-model="selectedCar.brand" id="brand" />

        <label for="model">Model</label>
        <input type="text" v-model="selectedCar.model" id="model" />

        <label for="year">Year</label>
        <input type="text" v-model="selectedCar.year" id="year" />

        <label for="malfunction">Malfunction</label>
        <input type="text" v-model="selectedCar.malfunction" id="malfunction" />

        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    car: {
      type: Object,
      requred: true,
    },
  },
  data() {
    return {
      selectedCar: { ...this.car }, // Create a copy to avoid mutating the prop directly
    };
  },
  methods: {
    save() {
      this.$emit("save", this.selectedCar);
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
