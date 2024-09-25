<template>
    <v-app-bar id="core-app-bar" class="px-3 custom-font">
        <v-btn v-show="!responsive" icon @click.stop="onClick">
            <v-icon>mdi-view-list</v-icon>
        </v-btn>
        <v-toolbar-title>
            <div class="d-flex">
                <v-img
                    src="/images/apprendre-en-traduisant.webp"
                    alt="Apprendre en traduisant"
                    max-width="36"
                    class="mr-2 icone"
                ></v-img>
                <v-btn to="/" variant="text" color="#2196F3">
                    Apprendre en traduisant
                </v-btn>
            </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn prepend-icon="mdi-abugida-thai" to="apprendre-alphabet-thai"  variant="text" color="#2196F3">
        Apprendre l'alphabet Thaï
        </v-btn>
        
        <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        slim
        @click="toggleTheme"
        color="#2196F3"
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

.icone{
    border-radius:10px;
}
</style>