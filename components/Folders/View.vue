<template>
  <!-- Main modal -->
  <!-- Main modal -->
  <div
    id="viewModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ data?.folder.name || 'Loading...' }}
            <span
              v-if="data?.folder"
              class="bg-blue-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >{{ data.folder.visibility == 1 ? 'Public' : 'Private' }}</span
            >
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="viewModal"
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
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div v-for="list in data?.lists" :key="list.id"
            class="p-4 mb-1 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 flex justify-between"
            role="alert"
          >
            <span class="font-medium">{{list.id}}</span> {{ list.name }}
            <span
              class="bg-blue-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >{{ list.visibility == 1 ? 'Public' : 'Private' }}</span
            >
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >

          <button
            data-modal-hide="viewModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
      hideModalBtn: null,
      data: null,
    }
  },
  mounted() {
    const $targetEl = document.getElementById('hideModalBtn')
    this.hideModalBtn = $targetEl
  },
  methods: {
    getData(id) {
      let vm = this
      vm.loading = true
      this.$axios
        .get(`/admin/folders/${id}?per_page=100&order_by=asc`)
        .then((res) => {
          console.log(res.data)
          vm.data = res.data
        })
        .catch((err) => {
          console.log(err.response)
        })
        .finally(() => {
          vm.loading = false
        })
    },
  },
  watch: {
    id: function (newVal, oldVal) {
      // console.log('id', newVal, oldVal)
      if (newVal != 0) {
        this.getData(newVal)
      } else {
        this.data = null
      }
    },
  },
}
</script>
