<template>
  <div class="">
    <div class="flex justify-between mb-3">
      <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Coupons
      </h1>

      <!-- drawer init and toggle -->
      <div class="text-center">
        <nuxt-link
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to="/coupon/create">
          Add new
        </nuxt-link>
      </div>
      <!-- drawer component -->
    </div>

    <v-server-table url="/admin/coupons" :columns="columns" :options="options" ref="usersTable">
      <div slot="coupon" slot-scope="{ row }">
        {{ row.coupon }}
        <span v-if="isExpired(row.expires)"
          class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Expired</span>

      </div>
      <div slot="actions" slot-scope="{ row }">
        <!-- update button -->
        <!-- delete button -->
        <DeleteButton target="deleteModal" :clickHandler="() => deleteHandler(row.id)" />
      </div>
    </v-server-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        'id',
        'coupon',
        'type',
        'user_id',
        'expires',
        'max_use',
        'used',
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
    deleteHandler(id) {
      if (confirm("are you sure ?") == false) {
        return
      }
      console.log('handle delete')
      let vm = this
      vm.loading = true
      this.$axios
        .delete(`/admin/coupons/${id}`)
        .then((res) => {
          console.log(res)
          vm.$toast.success('Coupon deleted')
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
    isExpired(date = null) {
      if (date == null) {
        return false
      }

      const d = new Date(date)
      const today = new Date()

      if (today.getTime() > d.getTime()) {
        return true

      }

      return false


    }

  },
}
</script>
