<template>
    <v-container class="pt-0">
        <v-col class="pt-0">
            <h1>Apprendre l'alphabet Thai - les consonnes</h1>
            <v-card class="d-flex justify-center mx-auto mt-5" max-width="250" min-height="250">
                <div class="square">
                    <div v-if="learningAlphabet.mode == 3" >
                        <p id="input-consonne-picture" v-bind:style="{ backgroundImage: learningAlphabet.inputValue }"></p>
                    </div>
                    <div v-else>
                        <p id="input-consonne">{{ learningAlphabet.inputValue }}</p>
                        <!--<p style="margin-right:5px;">Indice : </p>-->
                        <p id="result-indice">{{ learningAlphabet.indiceResult }}</p>
                    </div>
                </div> 
            </v-card>
        </v-col>
    </v-container>
    
    <v-container>
        <p class="p-choice-card">Veuillez choisir une carte : </p>
        <v-row class="card-consonne">
            <v-card class="card card-one" 
                v-bind:value="learningAlphabet.cardValue[0]" 
                v-bind:pathPicture="learningAlphabet.cardNamePicture[0]"
                :style="cardOneIsHovered ? { backgroundImage: learningAlphabet.cardPathPicture[0]} : {}" 
                @mouseover="cardOneIsHovered = true" 
                @mouseleave="cardOneIsHovered = false"
                @click="learningAlphabet.checkAnswer(learningAlphabet.cardValue[0])"
            >
                <p v-bind:pathPicture="learningAlphabet.cardNamePicture[0]">{{ learningAlphabet.cardResult[0] }}</p>
            </v-card>

            <v-card class="card card-two" 
                v-bind:value="learningAlphabet.cardValue[1]"
                v-bind:pathPicture="learningAlphabet.cardNamePicture[1]" 
                :style="cardTwoIsHovered ? { backgroundImage: learningAlphabet.cardPathPicture[1]} : {}" 
                @mouseover="cardTwoIsHovered = true" 
                @mouseleave="cardTwoIsHovered = false"
                @click="learningAlphabet.checkAnswer(learningAlphabet.cardValue[1])"
            >
                <p v-bind:pathPicture="learningAlphabet.cardNamePicture[1]" >{{ learningAlphabet.cardResult[1] }}</p>
            </v-card>

            <v-card class="card card-three" 
                v-bind:value="learningAlphabet.cardValue[2]" 
                v-bind:pathPicture="learningAlphabet.cardNamePicture[2]" 
                :style="cardThreeIsHovered ? { backgroundImage: learningAlphabet.cardPathPicture[2]} : {}" 
                @mouseover="cardThreeIsHovered = true" 
                @mouseleave="cardThreeIsHovered = false"
                @click="learningAlphabet.checkAnswer(learningAlphabet.cardValue[2])"
            >
                <p v-bind:pathPicture="learningAlphabet.cardNamePicture[2]">{{ learningAlphabet.cardResult[2] }}</p>
            </v-card>
        </v-row>
    </v-container>
    
    <div v-if="learningAlphabet.startApplication === true">
        <h2 style="font-size:30px;margin-bottom:10px;margin-top:10px;">Résultat : </h2>
        <div v-if="learningAlphabet.resultReponse === true">
            <p id="result" style="color:green">
                Bonne réponse !
            </p>
        </div>

        <div v-else style="color:red">
            Mauvaise réponse !
        </div>
    </div>
</template>

<script setup>

    import { ref, onMounted, onUnmounted } from 'vue';
    import Alphabet  from './assets/Alphabet.js'
    import AlphabetConsonne15  from './assets/json/alphabet-consonne-15.json'

    // Références pour les scripts ajoutés
    const jqueryScript = ref(null);
    const customScript = ref(null);
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

    // Fonction pour supprimer les scripts
    const removeScripts = () => {
    if (jqueryScript.value) {
        document.body.removeChild(jqueryScript.value);
        jqueryScript.value = null;
        console.log("jQuery supprimé");
    }
    if (customScript.value) {
        document.body.removeChild(customScript.value);
        customScript.value = null;
        console.log("learning.js supprimé");
        }
    };

    // Nettoyage lorsque le composant est détruit
    onUnmounted(() => {
        removeScripts();
    });

    console.log(learningAlphabet)

    onMounted(() => {
        learningAlphabet.setAlphabet(tableauConsonne);

        learningAlphabet.shakeTheArray();
        learningAlphabet.start();
        console.log("je charge")

        //commencer l'application maintenant

        // jqueryScript.value.onload = () => {
        //     console.log("jQuery chargé, maintenant je charge learning.js");

        //     learning = new learningClass(tableauConsonne);
                
        //     $('#learn-letter').on('click', function(){
        //         learning.learnLetter();

        //         $('#input-consonne').css({
        //             fontSize: '100px'
        //         })

        //         learning.start()
        //     })

        //     $('#learn-letter-e').on('click', function(){
        //         learning.learnLetterE();

        //         $('#input-consonne').css({
        //             fontSize: '100px'
        //         })

        //         learning.start()
        //     })

        //     $('#learn-exemple').on('click', function(){
        //         learning.learnExemple();

        //         $('#input-consonne').css({
        //             fontSize: '60px'
        //         })

        //         learning.start()
        //     })
            
        //     learning.shakeTheArray();
        //     learning.start();
        // };
    })

    

</script>

<style scoped>
    #input-consonne-picture{background-size:cover;height:200px;width:200px}
    .p-choice-card{margin-bottom:0;margin-top:20px;text-align:center;}
    .flex-co{display:flex;flex-direction:column}
    .center{
        display:flex;flex-direction:column;max-width: 600px;margin: auto;align-items: center;justify-content: center;
    }

    #input-consonne{
        font-size:80px;
        border:none;
        background-color:#fdfdfd;
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
        display:flex;align-items:center;justify-content:center;border: 1px solid #d0d0d0;padding: 20px;background-color: #fdfdfd;box-shadow: inset rgb(133 133 133 / 14%) 0px 0px 7px 0px;flex-direction: column;width:100%;
    }
    
    /*modifier la partie background-color pour la bonne couleur de la carte, par defaut green */
    .card{
        color:white;font-size:30px;background-color:green;margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
        background-size: cover;
        height: 150px;
        width: 150px;
    }

    .card>p{
        text-transform:uppercase;font-weight:bold;font-size: 60px;text-transform:uppercase;font-weight:bold;padding: 12px 20px;
    }
</style>