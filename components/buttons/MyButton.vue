<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<!-- <script>
export default {
  name: 'MyButton'
}
</script> -->

<style scoped>
.my-button {
  border: 1px solid black inset;
  padding:10px;
  border-radius:20px
}

.my-button:hover{
  opacity: 0.7;
  cursor:pointer;
  border:1px solid black;
}
</style>
