<template>
  <div class="relative w-full max-h-full">
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      <div
        class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ `Update  #${modelData.id}` }}
        </h3>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <div v-if="loading">Loading.....</div>
        <div v-else>
          <!-- name -->
          <FormulateForm
            name="foldersForm"
            id="folderForm"
            :errors="inputErrors"
          >
            <FormulateInput
              type="text"
              label="Word"
              name="word"
              label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              outer-class="mb-3"
              input-class="input-style"
              error-class="text-red-700 text-xs mb-1"
              placeholder="Xatta Trone"
              v-model="modelData.word"
              validation="required"
            />
            <FormulateInput
              v-model="modelData.is_reviewed"
              :options="{
                1: 'True',
                0: 'False',
              }"
              type="select"
              name="is_reviewed"
              placeholder="Select is_reviewed"
              label="Is Reviewed"
              validation="required|number"
              label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              outer-class="mb-3"
              input-class="input-style"
              error-class="text-red-700 text-xs mb-1"
            />

            <div v-show="modelData">
              <div
                v-for="(pos, i) in modelData?.word_data?.partsOfSpeeches"
                :key="i"
                class="w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <FormulateInput
                  v-model="pos.partsOfSpeech"
                  :options="{
                    noun: 'Noun',
                    verb: 'verb',
                    adjective: 'adjective',
                    adverb: 'adverb',
                  }"
                  type="select"
                  name="partsOfSpeech"
                  placeholder="Select partsOfSpeech"
                  label="partsOfSpeech"
                  validation="required"
                  label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  outer-class="mb-3"
                  input-class="input-style"
                  error-class="text-red-700 text-xs mb-1"
                />

                <div v-for="(def, j) in pos.definitions" :key="'def' + j">
                  <FormulateInput
                    type="text"
                    label="Definition"
                    name="definition"
                    label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    outer-class="mb-3"
                    input-class="input-style"
                    error-class="text-red-700 text-xs mb-1"
                    placeholder="Xatta Trone"
                    v-model="pos.definitions[j]"
                    validation="required"
                  />
                </div>

                <div v-for="(ex, k) in pos.examples" :key="'example-' + k">
                  <FormulateInput
                    type="text"
                    label="Example"
                    name="example"
                    label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    outer-class="mb-3"
                    input-class="input-style"
                    error-class="text-red-700 text-xs mb-1"
                    placeholder="Xatta Trone"
                    v-model="pos.examples[k]"
                    validation="required"
                  />
                </div>

                <div>
                  <p
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    GRE words ({{ pos.synonyms_gre.length }})
                  </p>
                  <label
                    for="gre"
                    class="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                    >Add new gre word</label
                  >
                  <input
                    type="text"
                    class="input-style"
                    name="gre"
                    v-model="greNew"
                    @keyup.prevent.enter="addGreWord(i)"
                  />

                  <div class="block mt-4">
                    <span
                      v-for="(word, z) in pos.synonyms_gre"
                      :key="'gre-' + z"
                      class="bg-blue-100 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                      >{{ word }}
                      <span
                        style="cursor: pointer"
                        @click.prevent="removeGreWords(i, z)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="inline-block"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path
                            d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                          ></path>
                          <path d="M10 10l4 4m0 -4l-4 4"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  <p
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                  >
                    Non GRE words ({{ pos.synonyms_normal.length }})
                  </p>
                  <label
                    for="NotGreNew"
                    class="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                    >Add new non gre word</label
                  >
                  <input
                    type="text"
                    class="input-style"
                    name="NotGreNew"
                    v-model="NotGreNew"
                    @keyup.prevent.enter="addNonGreWord(i)"
                  />

                  <div class="block mt-4">
                    <span
                      v-for="(word, z) in pos.synonyms_normal"
                      :key="'gre-normal-' + z"
                      class="bg-blue-100 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 mb-1 rounded dark:bg-blue-900 dark:text-blue-300"
                      >{{ word }}
                      <span
                        style="cursor: pointer"
                        @click.prevent="removeNonGreWords(i, z)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="inline-block"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path
                            d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                          ></path>
                          <path d="M10 10l4 4m0 -4l-4 4"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="block">
                  <button
                    type="button"
                    @click="removePos(i)"
                    class="float-right text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  @click="addPos"
                  class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Add new PoS
                </button>
              </div>
            </div>

            <div class="flex mt-4">
              <FormulateInput
                type="button"
                @click.prevent="handleSubmit"
                :disabled="loading"
                input-class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </FormulateInput>
            </div>
          </FormulateForm>
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
    // id: {
    //   type: String,
    //   required: true,
    // },
  },
  data() {
    return {
      id: null,
      loading: false,
      hideModalBtn: null,
      formEl: null,
      inputErrors: {},
      modelData: {},
      selectedUser: [],
      users: [],
      isLoading: false,
      posTemplate: {
        partsOfSpeech: '',
        definitions: [''],
        examples: [''],
        synonyms_gre: [],
        synonyms_normal: [],
      },
      greNew: '',
      NotGreNew: '',
    }
  },
  mounted() {
    const $targetEl = document.getElementById('hideModalBtn')
    this.hideModalBtn = $targetEl
    this.formEl = document.getElementById('folderForm')

    this.getData(this.$nuxt.$route.params.id)
  },
  created() {},
  methods: {
    getData(id) {
      let vm = this
      vm.loading = true
      this.$axios
        .get(`/admin/words/${id}`)
        .then((res) => {
          console.log(res.data)
          vm.modelData = res.data.data
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
        user_id: this.selectedUser.id,
      }
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
      const data = {
        name: this.modelData.name,
        visibility: parseInt(this.modelData.visibility),
      }
      this.$axios
        .put(`/admin/folders/${vm.id}`, data)
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
    removeGreWords(posI, itemI) {
      this.modelData.word_data.partsOfSpeeches[posI].synonyms_gre.splice(
        itemI,
        1
      )
    },
    removeNonGreWords(posI, itemI) {
      this.modelData.word_data.partsOfSpeeches[posI].synonyms_normal.splice(
        itemI,
        1
      )
    },
    addPos() {
      this.modelData.word_data.partsOfSpeeches.push(this.posTemplate)
    },
    removePos(index) {
      if (this.modelData.word_data.partsOfSpeeches.length < 2) {
        return alert('You can not delete the last item')
      }
      this.modelData.word_data.partsOfSpeeches.splice(index, 1)
    },
    addGreWord(i) {
      this.modelData.word_data.partsOfSpeeches[i].synonyms_gre.push(this.greNew)
      this.greNew = ''
    },
    addNonGreWord(i) {
      this.modelData.word_data.partsOfSpeeches[i].synonyms_normal.push(this.NotGreNew)
      this.NotGreNew = ''
    },

    // users search
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
