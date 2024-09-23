<template>
    <v-app-bar id="core-app-bar" class="px-3 custom-font">
        <v-btn v-show="!responsive" icon @click.stop="onClick">
            <v-icon>mdi-view-list</v-icon>
        </v-btn>
        <v-toolbar-title>
            <v-btn to="/">
                Apprendre en traduisant
            </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn prepend-icon="mdi-abugida-thai" to="apprendre-alphabet-thai">
        Apprendre l'alphabet 
        </v-btn>

        <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        slim
        @click="toggleTheme"
        ></v-btn>
    </v-app-bar>
</template>

<script setup>
import { useDisplay, useTheme } from 'vuetify'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const theme = useTheme()
const appStore = useAppStore()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const responsive = computed(() =>{
    const display = useDisplay();
    return display.lgAndUp.value;
})

const onClick = () => {
    appStore.setDrawer(!appStore.drawer);
}

// appStore.setDrawer(this.responsive);
</script>

<style>
#core-app-bar {
    width: auto;
}
</style>