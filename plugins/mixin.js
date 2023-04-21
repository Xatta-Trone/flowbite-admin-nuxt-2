import Vue from 'vue'
import { initFlowbite } from 'flowbite'

let mixin = {
  mounted() {
    initFlowbite()
  },
  data: function () {
    return {}
  },
  computed: {},
  created() {},
  beforeMount() {},
  beforeDestroy() {},
}

Vue.mixin(mixin)
