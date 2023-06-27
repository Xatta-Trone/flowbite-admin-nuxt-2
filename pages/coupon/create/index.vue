<template>
  <!-- Main modal -->
  <div class=" max-h-full">
    <!-- name -->
    <FormulateForm @submit="handleSubmit" name="usersForm" id="userForm" :errors="inputErrors">
      <FormulateInput type="text" label="Coupon" name="coupon"
        label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" outer-class="mb-3"
        input-class="input-style" error-class="text-red-700 text-xs mb-1" placeholder="Xatta Trone"
        v-model="data.coupon" />

      <!-- username -->
      <FormulateInput type="number" label="months" name="months"
        label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" outer-class="mb-3"
        input-class="input-style" error-class="text-red-700 text-xs mb-1" placeholder="xatta-trone" v-model="data.months"
        validation="required" />

      <FormulateInput v-model="data.type" :options="{ one_time: 'One Time', multiple: 'Multiple' }" type="select"
        placeholder="Select an option" label="Coupon type"
        input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

      <!-- username -->
      <FormulateInput type="number" label="max_use" name="max_use"
        label-class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" outer-class="mb-3"
        input-class="input-style" error-class="text-red-700 text-xs mb-1" placeholder="xatta-trone" v-model="data.max_use"
        validation="required" />

      <!-- username -->
      <FormulateInput type="date" label="Expires on" name="expires"
        label-class="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white" outer-class="mb-3"
        input-class="input-style" error-class="text-red-700 text-xs mb-1" placeholder="xatta-trone"
        v-model="data.expires" />



      <div class="flex">
        <FormulateInput type="submit" :disabled="loading"
          input-class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {{ id == 0 ? 'Create' : 'Update' }}
        </FormulateInput>
        <FormulateInput type="button" label="Reset" data-ghost
          input-class="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          @click="resetFrom" />
      </div>
    </FormulateForm>
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
      data: {
        coupon: '',
        months: 5,
        expires: null,
        type: 'one_time',
        max_use: 0,
      },
    }
  },
  mounted() {
    this.formEl = document.getElementById('userForm')
  },
  created() { },
  methods: {
    resetFrom() {
      this.$formulate.reset('usersForm')
    },
    resetValidation() {
      this.$formulate.resetValidation('usersForm')
    },
    handleSubmit() {
      console.log('handle create')
      let vm = this
      vm.loading = true

      const d = { ...this.data, months: parseInt(this.data.months), max_use: parseInt(this.data.max_use) }

      this.$axios
        .post('/admin/coupons', d)
        .then((res) => {
          console.log(res)
          vm.$toast.success('Coupon created')
          vm.inputErrors = {}
          vm.resetFrom()
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
