<template>
  <div class="btn-add-container">
    <button class="btn-add" @click="openAddModal()">Add new booking</button>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Hour</th>
          <th>Date</th>
          <th>Client ID</th>
          <th>Car ID</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.id">
          <td>{{ booking.id }}</td>
          <td>{{ booking.date }}</td>
          <td>{{ booking.hour }}</td>
          <td>{{ booking.clientID }}</td>
          <td>{{ booking.carID }}</td>
          <td>
            <button
              type="button"
              class="btn-refresh"
              @click="openUpdateModal(booking)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>

            <button
              type="button"
              class="btn-delete"
              @click="deleteBooking(booking)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <BookingAddModal
      v-if="isAddModalOpen"
      @close="isAddModalOpen = false"
      @add="addBooking"
    />

    <BookingUpdateModal
      v-if="isUpdateModalOpen"
      :booking="selectedBooking"
      @close="isUpdateModalOpen = false"
      @save="updateBooking"
    />
  </div>
</template>

<script>
import apiClient from "../axios.js";
import BookingUpdateModal from "./BookingUpdateModal.vue";
import BookingAddModal from "./BookingsAddModal.vue";

export default {
  data() {
    return {
      bookings: [],
      isAddModalOpen: false,
      isUpdateModalOpen: false,
      newBooking: null,
      selectedBooking: null,
    };
  },
  components: {
    BookingUpdateModal,
    BookingAddModal,
  },
  methods: {
    async fetchBookings() {
      try {
        const response = await apiClient.get("/Workshop/Bookings");
        this.bookings = response.data;
      } catch (error) {
        console.error("Error fetching Bookings:", error);
      }
    },
    async addBooking(newBooking) {
      try {
        await apiClient.post(`/Workshop/Bookings`, newBooking);
        this.isAddModalOpen = false;
        location.reload();
      } catch (error) {
        console.error("Error adding booking:", error);
      }
    },
    async updateBooking(editedBooking) {
      try {
        await apiClient.put(
          `/Workshop/Bookings/${editedBooking.id}`,
          editedBooking
        );
        const index = this.bookings.findIndex(
          (booking) => booking.id === editedBooking.id
        );
        if (index !== -1) {
          this.bookings.splice(index, 1, editedBooking);
        }
        this.isUpdateModalOpen = false;
      } catch (error) {
        console.error("Error updating booking", error);
      }
    },
    async deleteBooking(booking) {
      try {
        await apiClient.delete(`/Workshop/Bookings/${booking.id}`);
        location.reload();
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    },
    openAddModal() {
      this.isAddModalOpen = true;
    },
    openUpdateModal(booking) {
      this.selectedBooking = { ...booking };
      this.isUpdateModalOpen = true;
    },
  },
  created() {
    this.fetchBookings();
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.btn-refresh,
.btn-delete {
  padding-top: 6px;
  margin-right: 3px;
}

.btn-add-container {
  display: flex;
  justify-content: left;
}

.btn-add {
  text-align: center;
  border: 1px solid black;
  background-color: #f2f2f2;
  font-weight: bold;
  font-size: medium;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition-duration: 0.1s;
}

.btn-add:hover {
  color: #adadad;
}
</style>
