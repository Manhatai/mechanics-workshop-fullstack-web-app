<template>
  <div class="buttons-containter">
    <router-link :to="{ name: 'ClientsData' }" class="button-data"
      >Clients Data</router-link
    >
    <router-link :to="{ name: 'CarsData' }" class="button-data"
      >Cars Data</router-link
    >
    <router-link :to="{ name: 'BookingsData' }" class="button-data"
      >Bookings Data</router-link
    >
    <div class="spacer"></div>
    <router-link :to="{ name: 'LoginComponent' }" class="button-security"
      >Login</router-link
    >
    <router-link :to="{ name: 'RegisterComponent' }" class="button-security"
      >Sign up</router-link
    >
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

div a {
  font-weight: bold;
  color: black;
}

div a.router-link-exact-active {
  color: #adadad;
}

.buttons-containter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
}

.spacer {
  flex-grow: 1;
}

.button-data,
.button-security {
  text-align: center;
  border: 1px solid black;
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  transition-duration: 0.1s;
}

.button-data:hover,
.button-security:hover {
  color: #adadad;
}

.button-data {
  margin-right: 10px;
}

.button-security {
  margin-right: 0;
  margin-left: 10px;
}
</style>
