import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  position: 'bottom-right',
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  newestOnTop: true,
}

Vue.use(Toast, options)
