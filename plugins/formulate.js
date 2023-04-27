import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    outer: 'mb-3',
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
    input: 'input-style',
  },
})
