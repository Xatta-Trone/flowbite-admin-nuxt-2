import Vue from 'vue'
import { initFlowbite } from 'flowbite'

let mixin = {
  mounted() {
    initFlowbite()
  },
  data: function () {
    return {
      inputErrors: {},
      // formErrors: [],
    }
  },
  computed: {},
  created() {},
  beforeMount() {},
  beforeDestroy() {},
  methods: {
    handleErrors(err) {
      if (err == undefined) {
        return
      }
      console.log('inside handle handleErrors')
      console.log(err?.response)
      if (err?.response?.status == 401) {
        this.$auth.logout()
        return
      }

      // handle form errors
      if (
        err?.response &&
        err?.response?.status == 422 &&
        typeof err?.response?.data?.errors == 'object'
      ) {
        this.inputErrors = err.response.data.errors // assign field errors
      } else if (err.response.data?.errors != undefined) {
        this.$toast.error(err.response.data?.errors)
      } else {
        this.$toast.error(err.response.data)
      }
    },
  },
}

Vue.mixin(mixin)
