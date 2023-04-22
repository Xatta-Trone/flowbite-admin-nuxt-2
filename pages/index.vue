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

     <div
          id="drawer-example"
          class="fixed top-0 mt-14 right-0 z-40 w-full h-screen max-w-md p-4 overflow-y-auto transition-transform bg-slate-200 dark:bg-gray-900 translate-x-full"
          tabindex="-1"
          aria-labelledby="drawer-label"
          aria-hidden="true"
        >
          <button
            type="button"
            data-drawer-hide="drawer-example"
            aria-controls="drawer-example"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close menu</span>
          </button>
          <h1>Add New book</h1>
          <BooksCreate/>
        </div>
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
