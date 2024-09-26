<template>
    <v-container>
        <v-row class="mt-4">
            <v-card  max-width="300" cols="2" >
                <!--<v-list :items="items" @click="alphabetStore.changeStep('step-' + item.value)"></v-list>-->
                <AlphabetsList />
            </v-card>
            <v-col class="mx-auto pt-0">
                <v-col class="pt-0">
                    <div v-if="alertStore.alertDeveloppement == false">
                        <alert-information-prototype />
                    </div>
                    <div v-if="alphabetStore.step == 'step-1'" class="only-column" >
                        <AlphabetsConsonneOne />
                    </div>
                    <div v-else>
                        {{ alphabetStore.step }}
                        <button @click="handleClick('step-1')"></button>
                    </div>
                </v-col>
                
            </v-col>
            
            <!-- conteneur qui permet de débuger -->
            <v-card elevation-5 width="500px">
                <v-col>
                    <h2 class="text-uppercase mb-3">Débug</h2>
                    <v-divider></v-divider>
                    <h3 class="mt-3 mb-2">Informations mode : </h3>
                    <p class="ml-5"><strong>input</strong> : {{ ls.input }}</p>
                    <p class="ml-5"><strong>indice</strong> : {{ ls.indice }}</p>
                    <p class="ml-5"><strong>result</strong> : {{ ls.result }}</p>
                    <p class="ml-5"><strong>mode</strong> : {{ ls.mode }}</p>
                    <p class="ml-5"><strong>difficulté</strong> : {{ ls.difficulty }}</p>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <h3 class="mt-3 mb-2">Informations Joueur : </h3>
                    <p class="ml-5"><strong>score</strong> : {{ ls.score }}</p>
                    <p class="ml-5"><strong>Mode exercice</strong> : {{ ls.continueToWork }}</p>
                    <p class="ml-5"><strong>Nombre de bonne réponse d'affile</strong> : {{ ls.countGoodAnswer }}</p>
                    <p class="ml-5"><strong>Nombre de mauvaise réponse d'affile</strong> : {{ ls.countBadAnswer }}</p>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <h3 class="mt-3 mb-2">Informations de l'input : </h3>
                    <p class="ml-5"><strong>Taille de la police</strong> : {{ ls.sizeInput }}</p>
                    <p class="ml-5"><strong>Valeur de l'input</strong> : {{ ls.inputValue }}</p>
                    <p class="ml-5"><strong>Valeur de l'indice</strong> : {{ ls.indiceResult }}</p>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <h3 class="mt-3 mb-2">Informations des cartes : </h3>
                    <p class="ml-5"><strong>Taille de la police</strong> : {{ ls.sizePCard }}</p>
                    <p class="ml-5"><strong>Valeur des cartes</strong> : {{ ls.cardResult }}</p>
                    <p class="ml-5"><strong>Nom des images</strong> : {{ ls.cardNamePicture }}</p>
                    <p class="ml-5"><strong>Chemin des images</strong> : {{ ls.cardPathPicture }}</p>
                    <p class="ml-5"><strong>Fausse et vrai carte</strong> : {{ ls.cardValue }}</p>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <h3 class="mt-3 mb-2">Résultat de la console : </h3>
                    <textarea class="ml-5" style="width:100%; height:200px">{{ ls.console }}</textarea>
                </v-col>
            </v-card>
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
import { useLearningAlphabetStore } from '#imports';


    const alphabetStore = useAlphabetStore()
    const ls = useLearningAlphabetStore()
    const alertStore = useAlertStore()

    onNuxtReady(() => {
        alertStore.checkAlertDeveloppement() // Récupérer l'authentification une fois Nuxt prêt
    })

    const handleClick = (item) => {
        console.log('La valeur de item.value est :', item.value)
        alphabetStore.changeStep('step-' + item.value)
    }

    useHead({
        title: "Apprendre l'alphabet Thaïlandais",
        meta: [
        { name: 'Apprendre en traduisant', content: " Apprenez l'alphabet thaï en jouant ! Choisissez la bonne carte dans une série de tests progressifs, conçus pour vous faire mémoriser facilement les caractères et leur prononciation. " }
        ]
    })

</script>