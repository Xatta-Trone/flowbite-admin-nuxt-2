<template>
  <div class="">
    <div class="flex justify-between mb-3">
      <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Coupons
      </h1>

      <!-- drawer init and toggle -->
      <div class="text-center">
        <!-- <nuxt-link
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to="/coupon/create">
          Add new
        </nuxt-link> -->
      </div>
      <!-- drawer component -->
    </div>

    <v-server-table url="/admin/pending-words" :columns="columns" :options="options" ref="usersTable">

      <div slot="actions" slot-scope="{ row }">
        <!-- update button -->
        <button @click="approveHandler(row)" type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
        <!-- delete button -->
        <DeleteButton :clickHandler="() => deleteHandler(row)" />
      </div>
    </v-server-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        'word',
        'list_id',
        'approved',
        'tried',
        'actions',
      ],
      options: {
        headings: {
          id: '#',
        },
      },
      editId: 0,
      deleteId: 0,
      viewId: 0,
    }
  },
  mounted() { },
  created() {

  },
  methods: {
    deleteHandler(row) {
      if (confirm("are you sure ?") == false) {
        return
      }
      console.log('handle delete')
      let vm = this
      vm.loading = true
      this.$axios
        .delete(`/admin/pending-words/${row.list_id}?word=${row.word}`)
        .then((res) => {
          console.log(res)
          vm.$toast.success('Item deleted')
          this.$refs.usersTable.refresh()
          return
        })
        .catch((err) => {
          console.log(err)
          vm.handleErrors(err)
        })
        .finally(() => {
          vm.loading = false
        })
    },

    approveHandler(row) {
      if (confirm("are you sure ?") == false) {
        return
      }
      console.log('handle approve')
      let vm = this
      vm.loading = true
      this.$axios
        .put(`/admin/pending-words`, row)
        .then((res) => {
          console.log(res)
          vm.$toast.success('Item approved')
          this.$refs.usersTable.refresh()
          return
        })
        .catch((err) => {
          console.log(err)
          vm.handleErrors(err)
        })
        .finally(() => {
          vm.loading = false
        })
    },

  },
}
</script>
