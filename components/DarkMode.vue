<template>
  <button @click="toggle">{{ isDark ? 'Light' : 'Dark' }}</button>
</template>

<script>
export default {
  data() {
    return {
      isDark: false,
    }
  },
  mounted() {
    this.setDark()
  },
  methods: {
    setDark() {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        document.body.classList.add("dark:text-white","dark:bg-gray-800","dark:border-gray-700")
        this.isDark = true
      } else {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove("dark:text-white","dark:bg-gray-800","dark:border-gray-700")
        this.isDark = false
      }
    },

    toggle() {
      if (this.isDark) {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove("dark:text-white","dark:bg-gray-800","dark:border-gray-700")
        this.isDark = false
      } else {
        document.documentElement.classList.add('dark')
        document.body.classList.add("dark:text-white","dark:bg-gray-800","dark:border-gray-700")
        this.isDark = true
      }
    },
  },
}
</script>
