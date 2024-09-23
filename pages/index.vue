<template>
    <v-container>
        <div v-if="page == 'apprendreAlphabetThai'">
            <ApprendreAlphabetThai :test="test"/>
        </div>
        <div v-else>
            <h1>Main Content</h1>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'

const page = ref('a');

</script>

<style>
.v-toolbar-title:first-child {
  font-family: 'Comic Sans MS', 'Comic Sans', 'cursive';
}
.c-pointer{
  cursor:pointer;
}
</style>