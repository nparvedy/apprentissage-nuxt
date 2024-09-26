<template>
    <v-list v-model:selected='selection' :items="items" @click="handleClick(items[selection])" class="height-fit-content"></v-list>
</template>

<script>
    export default {
        
        setup() {

            const alphabetStore = useAlphabetStore()
            const test = "Commencer"

            const handleClick = (item) => {
                console.log('La valeur de item.value est :', item.value)
                alphabetStore.changeStep('step-' + item.value)
                
                learning.start();
            }

            return { alphabetStore, test, handleClick}
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
                        disabled: true
                    },
                },
                {
                    title: '30 à 44 lettres',
                    value: 3,
                    props: {
                        appendIcon: 'mdi-star-outline',
                        disabled: true
                    },
                },
                // { type: 'divider' },
                // { type: 'subheader', title: 'Voyelles' },
                // {
                //     title: 'Item #4',
                //     value: 4,
                //     props: {
                //         appendIcon: 'mdi-star-outline',
                //         disabled: true
                //     },
                // },
                // {
                //     title: 'Item #5',
                //     value: 5,
                //     props: {
                //         appendIcon: 'mdi-star-outline',
                //         disabled: true
                //     },
                // },
                // {
                //     title: 'Item #6',
                //     value: 6,
                //     props: {
                //         appendIcon: 'mdi-star-outline',
                //         disabled: true
                //     },
                // },
            ]
        }),
    };

</script>

<style>
    .v-card{
        max-height: fit-content !important;
    }
</style>