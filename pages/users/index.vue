<template>
  <div class="">
    <div class="flex justify-between mb-3">
      <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Users
      </h1>

      <!-- drawer init and toggle -->
      <div class="text-center">
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button" data-modal-target="staticModal" data-modal-toggle="staticModal" @click="createHandler">
          Add new
        </button>
      </div>
      <!-- drawer component -->
    </div>

    <UsersCreate :id="editId" />
    <UsersDelete :id="editId" />

    <v-server-table url="/admin/users" :columns="columns" :options="options" ref="usersTable">
      <div slot="name" slot-scope="{ row }">
        {{ row.name }}
        <span v-if="isPremium(row.expires_on)"
          class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Prmium</span>

      </div>
      <div slot="actions" slot-scope="{ row }">
        <!-- update button -->
        <EditButton target="staticModal" :clickHandler="() => editHandler(row.id)" />
        <!-- delete button -->
        <DeleteButton target="deleteModal" :clickHandler="() => editHandler(row.id)" />
      </div>
    </v-server-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: ['id', 'name', 'email', 'username', 'created_at', 'actions'],
      options: {
        headings: {
          id: '#',
        },
      },
      editId: 0,
      loading: false,
    }
  },
  mounted() {
  },
  created() {
    this.$nuxt.$on('refreshUsersTable', () => {
      console.log('refreshUsersTable')
      this.$refs.usersTable.refresh()
    })
    this.$nuxt.$on('userDeleted', () => {
      console.log('userDeleted')
      this.editId = 0
    })
    this.$nuxt.$on('vue-tables.loading', () => {
      this.loading = true
    })
    this.$nuxt.$on('vue-tables.loading', () => {
      this.loading = false
    })
  },
  methods: {
    editHandler(id) {
      this.editId = id

    },
    createHandler() {
      this.editId = 0
      this.$nuxt.$emit('userCreate')

    },
    isPremium(date = null) {
      if (date == null) {
        return false
      }

      const d = new Date(date)
      const today = new Date()

      if (today.getTime() > d.getTime()) {
        return false

      }

      return true


    }
  },
}
</script>
