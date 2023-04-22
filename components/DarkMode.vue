<template>
  <div @click="toggle">
    Dark
  </div>
</template>

<script>
export default {
  methods: {
    toggle() {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
  },
}
</script>
