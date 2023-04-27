<template>
  <!-- Main modal -->
  <div
    id="staticModal"
    data-modal-backdrop="static"
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
            {{ id == 0 ? 'Create User' : `Update User #${id}` }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="staticModal"
            id="hideModalBtn"
          >
            <svg
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
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div v-if="loading">Loading.....</div>
          <div v-else>
            <!-- name -->
            <FormulateForm
              @submit="handleSubmit"
              name="usersForm"
              id="userForm"
              :errors="inputErrors"
            >
              <FormulateInput
                type="text"
                label="Name"
                name="name"
                label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                outer-class="mb-3"
                input-class="input-style"
                error-class="text-red-700 text-xs mb-1"
                placeholder="Xatta Trone"
                v-model="user.name"
                validation="required"
              />
              <!-- email -->
              <FormulateInput
                type="email"
                label="Email"
                name="email"
                label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                outer-class="mb-3"
                input-class="input-style"
                error-class="text-red-700 text-xs mb-1"
                placeholder="xatta@email.com"
                v-model="user.email"
                validation="bail|required|email"
              />
              <!-- username -->
              <FormulateInput
                v-show="id != 0"
                type="text"
                label="Username"
                name="username"
                label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                outer-class="mb-3"
                input-class="input-style"
                error-class="text-red-700 text-xs mb-1"
                placeholder="xatta-trone"
                v-model="user.username"
                :validation="id == 0 ? '' : 'required'"
              />
              <div class="flex">
                <FormulateInput
                  type="submit"
                  :disabled="loading"
                  input-class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {{ id == 0 ? 'Create' : 'Update' }}
                </FormulateInput>
                <FormulateInput
                  type="button"
                  label="Reset"
                  data-ghost
                  input-class="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  @click="resetFrom"
                />
              </div>
            </FormulateForm>
          </div>
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
      formEl: null,
      inputErrors: {},
      user: {
        name: '',
        email: '',
        username: '',
      },
    }
  },
  mounted() {
    const $targetEl = document.getElementById('hideModalBtn')
    this.hideModalBtn = $targetEl
    this.formEl = document.getElementById('userForm')
    this.$nuxt.$on('userCreate', () => {
      console.log('userCreate')
      this.resetFrom()

    })
  },
  created() {},
  methods: {
    getUserData(id) {
      let vm = this
      vm.loading = true
      this.$axios
        .get(`/admin/users/${id}`)
        .then((res) => {
          vm.user = res.data.data
        })
        .catch((err) => {
          console.log(err.response)
        })
        .finally(() => {
          vm.loading = false
        })
    },

    handleSubmit() {
      console.log('inside handle submit')
      return this.id == 0 ? this.handleCreate() : this.handleUpdate()
    },
    resetFrom() {
      this.$formulate.reset('usersForm')
    },
    resetValidation() {
      this.$formulate.resetValidation('usersForm')
    },
    handleCreate() {
      console.log('handle create')
      let vm = this
      vm.loading = true
      this.$axios
        .post('/admin/users', this.user)
        .then((res) => {
          console.log(res)
          vm.$nuxt.$emit('refreshUsersTable')
          vm.$toast.success('User created')
          vm.inputErrors = {}
          vm.resetFrom()
          // vm.resetValidation()
          vm.hideModalBtn.click()
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

    handleUpdate() {
      console.log('handle update')
      let vm = this
      vm.loading = true
      this.$axios
        .put(`/admin/users/${vm.id}`, this.user)
        .then((res) => {
          console.log(res)
          vm.$nuxt.$emit('refreshUsersTable')
          vm.$toast.success('User updated')
          vm.inputErrors = {}
          // vm.resetValidation()
          vm.resetFrom()
          vm.hideModalBtn.click()
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
  watch: {
    id: function (newVal, oldVal) {
      // console.log('id', newVal, oldVal)
      if (newVal != 0) {
        this.getUserData(newVal)
      } else {
        this.formEl.reset()
      }
    },
  },
}
</script>
