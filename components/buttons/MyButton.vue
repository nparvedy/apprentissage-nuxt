<template>
  <v-btn prepend-icon="$vuetify">
    <slot></slot>
  </v-btn>
</template>

<!-- <script>
export default {
  name: 'MyButton'
}
</script> -->

<style scoped>
.my-button {
  border: 5px solid black inset;
  padding:10px;
  border-radius:20px
}

.my-button:hover{
  opacity: 0.7;
  cursor:pointer;
  border:1px solid black;
}
</style>
