<template>
  <div class="btn-add-container">
    <button class="btn-add" @click="openAddModal()">Add new client</button>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First name</th>
          <th>Last name</th>
          <th>E-mail</th>
          <th>Phone</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.id }}</td>
          <td>{{ client.firstName }}</td>
          <td>{{ client.lastName }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>
            <button
              type="button"
              class="btn-refresh"
              @click="openUpdateModal(client)"
            >
              <!-- When a client is selected for editing, a proper method is called -->
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
              @click="deleteClient(client)"
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

    <ClientAddModal
      v-if="isAddModalOpen"
      @close="isAddModalOpen = false"
      @add="addClient"
    />

    <ClientUpdateModal
      v-if="isUpdateModalOpen"
      :client="selectedClient"
      @close="isUpdateModalOpen = false"
      @save="updateClient"
    />
    <!-- :client="selectedClient" = Passing client data to the modal component, @save="updateClient" = Listening for the save/close event emmited by modal component -->
  </div>
</template>

<script>
import apiClient from "../axios.js";
import ClientUpdateModal from "./ClientUpdateModal.vue";
import ClientAddModal from "./ClientAddModal.vue";

export default {
  data() {
    return {
      clients: [],
      isAddModalOpen: false,
      isUpdateModalOpen: false,
      newClient: null,
      selectedClient: null,
    };
  },
  components: {
    ClientUpdateModal,
    ClientAddModal,
  },
  methods: {
    async fetchClients() {
      try {
        const response = await apiClient.get("/Workshop/Clients");
        this.clients = response.data;
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    },
    async addClient(newClient) {
      try {
        await apiClient.post(`/Workshop/Clients`, newClient);
        this.isAddModalOpen = false;
        location.reload();
      } catch (error) {
        console.error("Error adding client:", error);
      }
    },
    async updateClient(editedClient) {
      // editedClient references data passed by the modal when save event is emmited
      try {
        await apiClient.put(
          `/Workshop/Clients/${editedClient.id}`,
          editedClient
        );
        const index = this.clients.findIndex(
          // Finds the index of the updated client in local clients array
          (client) => client.id === editedClient.id
        );
        if (index !== -1) {
          this.clients.splice(index, 1, editedClient); // JS method to update the array (???)
        }
        this.isUpdateModalOpen = false;
      } catch (error) {
        console.error("Error updating client:", error);
      }
    },
    async deleteClient(client) {
      try {
        await apiClient.delete(`/Workshop/Clients/${client.id}`);
        location.reload(); // Reloads the page
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    },
    openAddModal() {
      this.isAddModalOpen = true;
    },
    openUpdateModal(client) {
      this.selectedClient = { ...client }; // "..." = Spread syntax,
      this.isUpdateModalOpen = true;
    },
  },
  created() {
    this.fetchClients();
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
