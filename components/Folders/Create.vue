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
            {{ id == 0 ? 'Create ' : `Update  #${id}` }}
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
              name="foldersForm"
              id="folderForm"
              :errors="inputErrors"
            >
              <FormulateInput
                type="text"
                label="Folder Name"
                name="name"
                label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                outer-class="mb-3"
                input-class="input-style"
                error-class="text-red-700 text-xs mb-1"
                placeholder="Xatta Trone"
                v-model="modelData.name"
                validation="required"
              />
              <FormulateInput
                v-model="modelData.visibility"
                :options="{
                  2: 'Private',
                  1: 'Public',
                }"
                type="select"
                name="visibility"
                placeholder="Select Visibility"
                label="Folder visibility"
                validation="required|number"
                label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                outer-class="mb-3"
                input-class="input-style"
                error-class="text-red-700 text-xs mb-1"
              />

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="ajax">Search Users</label>
                <multiselect
                  v-model="selectedUser"
                  id="ajax"
                  label="name"
                  track-by="code"
                  class="input-style"
                  placeholder="Type to search"
                  open-direction="bottom"
                  :options="users"
                  :multiple="false"
                  :searchable="true"
                  :loading="isLoading"
                  :internal-search="false"
                  :clear-on-select="false"
                  :close-on-select="false"
                  :options-limit="300"
                  :limit="3"
                  :max-height="600"
                  :show-no-results="false"
                  :hide-selected="true"
                  @search-change="asyncFind"
                  :required="id == 0"
                >
                  <template slot="tag" slot-scope="{ option, remove }"
                    ><span class="custom__tag"
                      ><span>{{ option.name }}-{{ option.email }}-{{ option.username }}</span
                      ><span class="custom__remove" @click="remove(option)"
                        >❌</span
                      ></span
                    ></template>

                </multiselect>
              </div>

              <div class="flex mt-4">
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
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
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
      modelData: {
        title: '',
        visibility: 1,
        user_id: '',
      },
      selectedUser: [],
      users: [],
      isLoading: false,
    }
  },
  mounted() {
    const $targetEl = document.getElementById('hideModalBtn')
    this.hideModalBtn = $targetEl
    this.formEl = document.getElementById('folderForm')
    this.$nuxt.$on('folderCreate', () => {
      console.log('folderCreate')
      this.resetFrom()
    })
  },
  created() {},
  methods: {
    getData(id) {
      let vm = this
      vm.loading = true
      this.$axios
        .get(`/admin/folders/${id}`)
        .then((res) => {
          console.log(res.data)
          vm.modelData = res.data.folder
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
      this.$formulate.reset('foldersForm')
    },
    resetValidation() {
      this.$formulate.resetValidation('foldersForm')
    },
    handleCreate() {
      console.log('handle create')
      let vm = this
      vm.loading = true
      const data = {
        name: this.modelData.name,
        visibility: parseInt(this.modelData.visibility),
        user_id: this.selectedUser.id

      };
      this.$axios
        .post('/admin/folders', data)
        .then((res) => {
          console.log(res)
          vm.$nuxt.$emit('refreshFoldersTable')
          vm.$toast.success('Folder created')
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
        .put(`/admin/folders/${vm.id}`, this.modelData)
        .then((res) => {
          console.log(res)
          vm.$nuxt.$emit('refreshFoldersTable')
          vm.$toast.success('Folder updated')
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
    // users search
    limitText(count) {
      return `and ${count} other countries`
    },
    asyncFind(query) {
      let vm = this
      vm.isLoading = true
      this.$axios
        .get(`/admin/users?query=${query}`)
        .then((res) => {
          console.log(res.data)
          vm.users = res.data.data
        })
        .catch((err) => {
          console.log(err.response)
        })
        .finally(() => {
          vm.isLoading = false
        })
    },
    clearAll() {
      this.selectedUser = []
    },
  },
  watch: {
    id: function (newVal, oldVal) {
      // console.log('id', newVal, oldVal)
      if (newVal != 0) {
        this.getData(newVal)
      } else {
        this.formEl.reset()
      }
    },
  },
}
</script>
