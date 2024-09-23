<template>
    <h1>Apprendre l'alphabet Thai</h1>
    <h2 >Pour commencer les consonnes</h2>
    <div class="d-flex justify-center">
        <div class="square">
            <p id="input-consonne"></p>
            <!--<p style="margin-right:5px;">Indice : </p>-->
            <p id="result-indice"></p>
        </div> 
    </div>
    
    <div class="flex-co">
        <p style="margin-bottom:0;margin-top:20px;text-align:center;">Veuillez choisir une carte : </p>
        <div class="card-consonne">
            <div class="card" value="true" pathPicture="${pathPicture}">
                <p class="card"  value="true" pathPicture="${pathPicture}">{{ learningAlphabet.cardResult[0] }}</p>
            </div>

            <div class="card" value="true" pathPicture="${pathPicture}">
                <p class="card"  value="true" pathPicture="${pathPicture}">{{ learningAlphabet.cardResult[1] }}</p>
            </div>

            <div class="card" value="true" pathPicture="${pathPicture}">
                <p class="card"  value="true" pathPicture="${pathPicture}">{{ learningAlphabet.cardResult[2] }}</p>
            </div>
        </div>
    </div>
    <h2 style="font-size:30px;margin-bottom:10px;margin-top:10px;">Résultat : </h2>
    <p id="result"></p>
</template>

<script setup>

    import { ref, onMounted, onUnmounted } from 'vue';
    import learningClass from './assets/Learning.js'
    import Alphabet  from './assets/Alphabet.js'
    import AlphabetConsonne15  from './assets/json/alphabet-consonne-15.json'

    // Références pour les scripts ajoutés
    const jqueryScript = ref(null);
    const customScript = ref(null);
    const learningAlphabet = useLearningAlphabetStore()
    let learning = ref(null)

    const consonne = AlphabetConsonne15;

    const tableauConsonne = [];

    // Boucle pour créer les objets consonne
    for (let i = 0; i < consonne.length; i++) {
        const [letter, letterE, exemple, exempleTranslated, color, pathPicture, word] = consonne[i];  // Décomposition des éléments du sous-tableau
        const AlphabetConsonne = new Alphabet(letter, letterE, exemple, exempleTranslated, color, pathPicture, word, 0, 'consonne');  // Création d'un objet Humain
        tableauConsonne.push(AlphabetConsonne);  // Ajout de l'objet Humain dans le tableau
    }

    console.log(tableauConsonne)

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

    onMounted(() => {
        learningAlphabet.setAlphabet(tableauConsonne);

        learningAlphabet.shakeTheArray();
        learningAlphabet.start();

        //commencer l'application maintenant

        // jqueryScript.value = document.createElement('script');
        // jqueryScript.value.src = "https://code.jquery.com/jquery-3.7.1.min.js";
        // jqueryScript.value.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
        // jqueryScript.value.crossOrigin = "anonymous";
        // jqueryScript.value.async = true;
        // document.body.appendChild(jqueryScript.value);

        // jqueryScript.value.onload = () => {
        //     console.log("jQuery chargé, maintenant je charge learning.js");

        //     learning = new learningClass(tableauConsonne);

        //     $('.card').on('click', function(e){
        //     //this n'est pas l'objet en question car on est dans un évènement
        //         console.log($(e.target).attr('value'))
        //         if ($(e.target).attr('value') == "true")
        //         {
        //             learning.greatAnswer();
        //             learning.start();
        //         }else{
        //             learning.wrongAnswer();
        //             learning.start();
        //         }
        //     })
                
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
        display:flex;align-items:center;justify-content:center;border: 1px solid #d0d0d0;margin-top: 20px;padding: 20px;background-color: #fdfdfd;box-shadow: inset rgb(133 133 133 / 14%) 0px 0px 7px 0px;flex-direction: column;width:100%;
    }
    
    /*modifier la partie background-color pour la bonne couleur de la carte, par defaut green */
    .card{
        color:white;font-size:30px;background-color:"green";margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)
    }
    .card>p{
        text-transform:uppercase;font-weight:bold;font-size: 60px;text-transform:uppercase;font-weight:bold;padding: 12px 20px;
    }
</style>