<template>
  <div class="">
    <div class="flex justify-between mb-3">
      <h1
        class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
      >
        Lists
      </h1>

      <!-- drawer init and toggle -->
      <div class="text-center">
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          data-modal-target="staticModal"
          data-modal-toggle="staticModal"
          @click="createHandler"
        >
          Add new
        </button>
      </div>
      <!-- drawer component -->
    </div>

    <v-server-table
      url="/admin/lists"
      :columns="columns"
      :options="options"
      ref="usersTable"
    >
      <div slot="visibility" slot-scope="{ row }">
        <span v-if="row.visibility == 1" class="bg-blue-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Public</span>
        <span v-if="row.visibility == 2" class="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Private</span>
      </div>
      <div slot="actions" slot-scope="{ row }">
        <!-- update button -->
        <EditButton
          target="staticModal"
          :clickHandler="() => editHandler(row.id)"
        />
        <!-- delete button -->
        <DeleteButton
          target="deleteModal"
          :clickHandler="() => editHandler(row.id)"
        />
        <ViewButton
          target="viewModal"
          :clickHandler="() => editHandler(row.id)"
        />
      </div>
    </v-server-table>
    <ListsCreate :id="editId" />
    <ListsDelete :id="editId" />
    <ListsView :id="editId" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        'id',
        'name',
        'visibility',
        'user.username',
        'crated_at',
        'actions',
      ],
      options: {
        headings: {
          id: '#',
          "user.username":"Username"
        },
      },
      editId: 0,
    }
  },
  mounted() {},
  created() {
    this.$nuxt.$on('refreshListsTable', () => {
      console.log('refreshListsTable')
      this.$refs.usersTable.refresh()
    })
    this.$nuxt.$on('listDeleted', () => {
      console.log('listDeleted')
      this.editId = 0
    })
  },
  methods: {
    editHandler(id) {
      this.editId = id
    },
    createHandler() {
      this.editId = 0
      this.$nuxt.$emit('listCreate')
    },
  },
}
</script>
