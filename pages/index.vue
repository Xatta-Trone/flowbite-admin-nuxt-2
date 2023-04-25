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
        >
          Add new
        </button>
      </div>
      <!-- drawer component -->
    </div>

    <v-server-table url="/admin/users" :columns="columns" :options="options">
      <div slot="actions" slot-scope="{ row }">
        <!-- update button -->
        <button
          type="button"
          id="updateProductButton"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
          data-drawer-placement="right"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Update {{ row.id }}
        </button>
        <!-- delete button -->
        <button
          type="button"
          id="deleteProductButton"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
          data-drawer-placement="right"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Delete item
        </button>
      </div>
    </v-server-table>
    <OffCanvas :title="drawer.title" :component="drawer.component" />
  </div>
</template>
<script>
import { Drawer } from 'flowbite'
export default {
  components: {},
  data() {
    return {
      columns: ['id', 'name', 'email', 'username', 'created_at', 'actions'],
      options: {
        headings: {
          id: '#',
        },
      },
      drawer: {
        title: 'Add new book',
        component: 'BooksCreate',
      },
    }
  },
  mounted() {
    // const $targetEl = document.getElementById('drawer-example')
    // const options = {
    //   placement: 'right',
    //   backdrop: true,
    //   bodyScrolling: false,
    //   edge: false,
    //   edgeOffset: '',
    //   backdropClasses:
    //     'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
    //   onHide: () => {
    //     console.log('drawer is hidden')
    //   },
    //   onShow: () => {
    //     console.log('drawer is shown')
    //   },
    //   onToggle: () => {
    //     console.log('drawer has been toggled')
    //   },
    // }
    // const drawer = new Drawer($targetEl,options)
    // this.draw = drawer
  },
  methods: {
    setDrawer(){
      
    }
  },
}
</script>
