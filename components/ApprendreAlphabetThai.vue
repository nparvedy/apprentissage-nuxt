<template>
    <v-row class="mt-8">
        <v-card  max-width="300" cols="2" >
            <!--<v-list :items="items" @click="alphabetStore.changeStep('step-' + item.value)"></v-list>-->
            <v-list v-model:selected='selection' :items="items" @click="handleClick(items[selection])"></v-list>

        </v-card>
        <v-col cols="4" class="mx-auto">
            <v-col>
                <div v-if="alphabetStore.step == 'step-1'" class="only-column">
                    <AlphabetsConsonneOne />
                </div>
                <div v-else>
                    {{ alphabetStore.step }}
                    <button @click="handleClick('step-1')"></button>
                </div>
            </v-col>
        </v-col>
    
    </v-row>
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

<script>
    import learningAlphabet from '@/assets/learning.js';

    export default {
        mounted() {
            learningAlphabet(); // Appelle la fonction ou le code dans ton script
        },

        setup() {
            const alphabetStore = useAlphabetStore()
            const test = "1"

            const handleClick = (item) => {
                console.log('La valeur de item.value est :', item.value)
                alphabetStore.changeStep('step-' + item.value)
            }

            return { alphabetStore, test, handleClick }
        },

        data: () => ({
            selection: [1],
            items: [
                { type: 'subheader', title: 'Consonne' },
                {
                    title: '15 premières lettres',
                    value: 1,
                    props: {
                        appendIcon: 'mdi-star-outline',
                    }
                },
                {
                    title: 'de 15 à 30 lettres',
                    value: 2,
                    props: {
                        appendIcon: 'mdi-star-outline',
                    },
                },
                {
                    title: '30 à 44 lettres',
                    value: 3,
                    props: {
                        appendIcon: 'mdi-star-outline',
                    },
                },
                { type: 'divider' },
                { type: 'subheader', title: 'Voyelles' },
                {
                    title: 'Item #4',
                    value: 4,
                    props: {
                        appendIcon: 'mdi-star-outline',
                    },
                },
                {
                    title: 'Item #5',
                    value: 5,
                    props: {
                        appendIcon: 'mdi-star-outline',
                    },
                },
                {
                    title: 'Item #6',
                    value: 6,
                    props: {
                        appendIcon: 'mdi-star-outline',
                    },
                },
            ]
        }),
    };

</script>