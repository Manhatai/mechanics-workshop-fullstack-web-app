// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import ClientsData from "@/components/ClientsComponents/ClientsData.vue";
import CarsData from "@/components/CarsComponents/CarsData.vue";
import BookingsData from "@/components/BookingComponents/BookingsData.vue";
import LoginComponent from "@/components/SecurityComponents/LoginComponent.vue";
import RegisterComponent from "@/components/SecurityComponents/RegisterComponent.vue";

const routes = [
  {
    path: "/Authorization/login",
    name: "LoginComponent",
    component: LoginComponent,
  },
  {
    path: "/Authorization/register",
    name: "RegisterComponent",
    component: RegisterComponent,
  },
  {
    path: "/Clients",
    name: "ClientsData",
    component: ClientsData,
  },
  {
    path: "/Cars",
    name: "CarsData",
    component: CarsData,
  },
  {
    path: "/Bookings",
    name: "BookingsData",
    component: BookingsData,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
