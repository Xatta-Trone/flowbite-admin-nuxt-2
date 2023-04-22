<template>
  <div class="">
    <!-- <v-client-table :data="tableData" :columns="columns" /> -->
    <div class="flex justify-between mb-3">
      <h1
        class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
      >
        Books
      </h1>

      <!-- drawer init and toggle -->
      <div class="text-center">
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
          data-drawer-placement="right"
          data-drawer-backdrop="false"
          :data-drawer-onHide="pickHide"
        >
          Add new
        </button>

      </div>
      <!-- drawer component -->
    </div>

    <v-server-table
      url="https://server.pl-tutorials.com/api/v1/books"
      :columns="columns"
      :options="options"
    />
    <OffCanvas title="Add new book" component="BooksCreate"/>


  </div>
</template>
<script>
import Vuetable from 'vuetable-2'
export default {
  components: {
    Vuetable,
  },
  data() {
    return {
      columns: ['id', 'name', 'author'],
      tableData: [
        { id: 1, name: 'John', author: '20' },
        { id: 2, name: 'Jane', author: '24' },
        { id: 3, name: 'Susan', author: '16' },
        { id: 4, name: 'Chris', author: '55' },
        { id: 5, name: 'Dan', author: '40' },
      ],
      options: {
        // perPage: 10,
        // perPageValues: [5, 10, 15, 25, 50, 100],
        // pagination: { chunk: 5 },
        // orderBy: { ascending: false },
        headings: {
          id: '#',
        },
        // requestFunction(data) {
        //   return this.$axios
        //     .get(this.url, {
        //       params: data,
        //     })
        //     // .then(data => {
        //     //   console.log(data)
        //     // })
        //     .catch(function (e) {
        //       this.dispatch('error', e)
        //     })
        // },
      },
      table: {
        tableWrapper: '',
        tableHeaderClass: 'mb-0',
        tableBodyClass: 'mb-0',
        tableClass: 'table table-bordered table-hover',
        loadingClass: 'loading',
        ascendingIcon: 'fa fa-chevron-up',
        descendingIcon: 'fa fa-chevron-down',
        ascendingClass: 'sorted-asc',
        descendingClass: 'sorted-desc',
        sortableIcon: 'fa fa-sort',
        detailRowClass: 'vuetable-detail-row',
        handleIcon: 'fa fa-bars text-secondary',
        renderIcon(classes, options) {
          return `<i class="${classes.join(' ')}"></span>`
        },
      },
    }
  },
  methods: {
    pickHide(){
      alert("hide")
    }
  }
}
</script>
