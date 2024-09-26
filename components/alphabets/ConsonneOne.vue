<template>
    <v-container class="pt-0">
        <v-col class="pt-0">
            <h1>Apprendre l'alphabet Thai - les consonnes</h1>
            <v-card class="d-flex justify-center mx-auto mt-5" max-width="250" min-height="250">
                <div class="square">
                    <div v-if="learningAlphabet.mode == 3">
                        <p id="input-consonne-picture" :style="
                            { 
                                backgroundImage: learningAlphabet.inputValue,
                            }
                            "></p>
                    </div>
                    <div v-else>
                        <p id="input-consonne" v-bind:style="{ fontSize: learningAlphabet.sizeInput }">{{ learningAlphabet.inputValue }}</p>
                        <!--<p style="margin-right:5px;">Indice : </p>-->
                        <p id="result-indice">{{ learningAlphabet.indiceResult }}</p>
                    </div>
                </div> 
            </v-card>
        </v-col>
    </v-container>
    
    <v-container>
        <v-row class="mb-2"><v-chip prepend-icon="mdi-arrow-down-left" append-icon="mdi-arrow-down-right" variant="elevated" color="#3e3e3e" size="x-large" class="mx-auto">Veuillez choisir une carte : </v-chip></v-row>
        
        <v-row class="card-consonne mx-auto justify-center w-100">
            <v-card class="card card-one" 
                v-bind:value="learningAlphabet.cardValue[0]" 
                v-bind:pathPicture="learningAlphabet.cardNamePicture[0]"
                :style="learningAlphabet.showAnyway || cardOneIsHovered ? { backgroundImage: learningAlphabet.cardPathPicture[0]} : {}" 
                @mouseover="cardOneIsHovered = true" 
                @mouseleave="cardOneIsHovered = false"
                @click="learningAlphabet.checkAnswer(learningAlphabet.cardValue[0])"
            >
                <p v-bind:pathPicture="learningAlphabet.cardNamePicture[0]" v-bind:style="{ fontSize: learningAlphabet.sizePCard }">{{ learningAlphabet.cardResult[0] }}</p>
            </v-card>

            <v-card class="card card-two" 
                v-bind:value="learningAlphabet.cardValue[1]"
                v-bind:pathPicture="learningAlphabet.cardNamePicture[1]" 
                :style="learningAlphabet.showAnyway || cardTwoIsHovered ? { backgroundImage: learningAlphabet.cardPathPicture[1]} : {}" 
                @mouseover="cardTwoIsHovered = true" 
                @mouseleave="cardTwoIsHovered = false"
                @click="learningAlphabet.checkAnswer(learningAlphabet.cardValue[1])"
            >
                <p v-bind:pathPicture="learningAlphabet.cardNamePicture[1]" v-bind:style="{ fontSize: learningAlphabet.sizePCard } ">{{ learningAlphabet.cardResult[1] }}</p>
            </v-card>

            <v-card class="card card-three" 
                v-bind:value="learningAlphabet.cardValue[2]" 
                v-bind:pathPicture="learningAlphabet.cardNamePicture[2]" 
                :style="learningAlphabet.showAnyway || cardThreeIsHovered ? { backgroundImage: learningAlphabet.cardPathPicture[2]} : {}" 
                @mouseover="cardThreeIsHovered = true" 
                @mouseleave="cardThreeIsHovered = false"
                @click="learningAlphabet.checkAnswer(learningAlphabet.cardValue[2])"
            >
                <p v-bind:pathPicture="learningAlphabet.cardNamePicture[2]" v-bind:style="{ fontSize: learningAlphabet.sizePCard }">{{ learningAlphabet.cardResult[2] }}</p>
            </v-card>
        </v-row>
    </v-container>

    <div v-if="learningAlphabet.startApplication === true">
        <h2 style="font-size:30px;margin-bottom:10px;margin-top:10px;">Résultat : </h2>
        <div v-if="learningAlphabet.resultReponse === true">
            <p id="result" class="info-success" style="color:green">
                <v-icon class="icon-check">mdi-check-bold</v-icon>
                Bonne réponse !
            </p>
        </div>

        <div v-else style="color:red" class="info-error">
            <v-icon class="icon-error">mdi-alert-circle</v-icon>
            Mauvaise réponse !
        </div>
    </div>
</template>

<script setup>

    import { ref, onMounted, onUnmounted } from 'vue';
    import Alphabet  from './assets/Alphabet.js'
    import AlphabetConsonne15  from './assets/json/alphabet-consonne-15.json'

    // Références pour les scripts ajoutés
    const learningAlphabet = useLearningAlphabetStore()
    const cardOneIsHovered = ref(false);
    const cardTwoIsHovered = ref(false);
    const cardThreeIsHovered = ref(false);

    const consonne = AlphabetConsonne15;

    const tableauConsonne = [];

    // Boucle pour créer les objets consonne
    for (let i = 0; i < consonne.length; i++) {
        const [letter, letterE, exemple, exempleTranslated, color, pathPicture, word] = consonne[i];  // Décomposition des éléments du sous-tableau
        const AlphabetConsonne = new Alphabet(letter, letterE, exemple, exempleTranslated, color, pathPicture, word, 0, 'consonne');  // Création d'un objet Humain
        tableauConsonne.push(AlphabetConsonne);  // Ajout de l'objet Humain dans le tableau
    }

    // Nettoyage lorsque le composant est détruit
    onUnmounted(() => {
    });

    console.log(learningAlphabet)

    onMounted(() => {
        learningAlphabet.setAlphabet(tableauConsonne);

        learningAlphabet.shakeTheArray();
        learningAlphabet.loadState();
        learningAlphabet.start();
    })
</script>

<style scoped>
    .size-p{font-size:25px}
    #input-consonne-picture{background-size:cover;height:200px;width:200px}
    .p-choice-card{margin-bottom:0;margin-top:20px;text-align:center;}
    .flex-co{display:flex;flex-direction:column}
    .center{
        display:flex;flex-direction:column;max-width: 600px;margin: auto;align-items: center;justify-content: center;
    }

    #input-consonne{
        border:none;
        text-align: center;
        width:100%
    }

    #result-indice{
        font-size:30px;
        text-align: center;
    }

    .card-consonne{
        display:flex;
        justify-content: center;
    }

    #result{
        text-align:center;
        margin:0;
        font-weight:bold;
    }

    .card{
        border-radius: 20px;
    }

    h1, h2{
        text-align:center;
    }

    .only-column{
        display:flex;
        flex-direction:column;
        align-items:center;
    }

    .square{
        display:flex;align-items:center;justify-content:center;border: 1px solid #d0d0d0;padding: 20px;box-shadow: inset rgb(133 133 133 / 14%) 0px 0px 7px 0px;flex-direction: column;width:100%;
    }
    
    /*modifier la partie background-color pour la bonne couleur de la carte, par defaut green */
    .card{
        color:white;font-size:30px;background-color:green;margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
        background-size: cover;
        min-height: 150px;
        min-width: 150px;
    }

    .card>p{
        text-transform:uppercase;font-weight:bold;text-transform:uppercase;font-weight:bold;padding: 12px 20px;text-align: center;
    }

    .info-success {
        background-color: #e0ffe6;
        border: 1px solid #00b894;
        color: #2d3436;
        padding: 15px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        font-size: 1.1em;
        font-weight: 500;
    }

    .icon-check {
        color: #00b894;
        margin-right: 10px;
        font-size: 1.5em;
    }

    .info-error {
        background-color: #ffe0e0;
        border: 1px solid #d63031;
        color: #2d3436;
        padding: 15px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        font-size: 1.1em;
        font-weight: 500;
        }

    .icon-error {
        color: #d63031;
        margin-right: 10px;
        font-size: 1.5em;
    }
</style>