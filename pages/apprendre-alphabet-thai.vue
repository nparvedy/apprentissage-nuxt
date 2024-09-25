<template>
    <v-container>
        <v-row class="mt-4">
            <v-card  max-width="300" cols="2" >
                <!--<v-list :items="items" @click="alphabetStore.changeStep('step-' + item.value)"></v-list>-->
                <AlphabetsList />
            </v-card>
            <v-col class="mx-auto pt-0">
                <v-col class="pt-0">
                    <div v-if="alphabetStore.step == 'step-1'" class="only-column" >
                        <AlphabetsConsonneOne />
                    </div>
                    <div v-else>
                        {{ alphabetStore.step }}
                        <button @click="handleClick('step-1')"></button>
                    </div>
                </v-col>
                
            </v-col>
            
        </v-row>
    
        <!--<v-btn @click="learning.start()" class="mt-7 ml-8">Commencer</v-btn>-->
    </v-container>
</template>

<style scoped>

    h1, h2{
        text-align:center;
    }

    .only-column{
        display:flex;
        flex-direction:column;
        align-items:center;
    }
</style>

<script setup>
    import { ref } from 'vue';

    // Références pour les scripts ajoutés

    const alphabetStore = useAlphabetStore()

    const handleClick = (item) => {
        console.log('La valeur de item.value est :', item.value)
        alphabetStore.changeStep('step-' + item.value)
    }

</script>