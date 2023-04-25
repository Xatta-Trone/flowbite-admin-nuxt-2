<template>
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
    <h1>{{ title }}</h1>
    <component :is="chooseChildComponent"></component>
  </div>
</template>

<script>
const BooksCreate = () => import("./Books/Create");
const UsersCreate = () => import("./Users/Create");
// import BooksCreate from './Books/Create';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    component: {
      type: String,
      required: true,
    }
  },

  computed: {
    chooseChildComponent() {
      if (this.component == "BooksCreate") return BooksCreate
      if (this.component == "UsersCreate") return UsersCreate
    },
  },
}
</script>
