<script>
  export default {
    props: {
      showing: {
        type: Number
      },
      total: {
        type: Number
      }
    }
  }
</script>

<template>
  Showing {{ showing }} out of total {{ total }} planets!
</template>