<template>
    <v-container>
        <v-row class="mt-8">
            <v-card  max-width="300" cols="2" >
                <!--<v-list :items="items" @click="alphabetStore.changeStep('step-' + item.value)"></v-list>-->
                <AlphabetsList />
            </v-card>
            <v-col cols="4" class="mx-auto">
                <v-col>
                    <div v-if="alphabetStore.step == 'step-1'" class="only-column" >
                        <AlphabetsConsonneOne :learning="learning"/>
                    </div>
                    <div v-else>
                        {{ alphabetStore.step }}
                        <button @click="handleClick('step-1')"></button>
                    </div>
                </v-col>
                
            </v-col>
            
        </v-row>
    
        <v-btn @click="learning.start()" class="mt-7 ml-8">Commencer</v-btn>
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
        height:335px;
    }
</style>

<script setup>

    import { ref, onMounted, onUnmounted } from 'vue';
    import learningClass  from './assets/Learning.js'
    import Alphabet  from './assets/Alphabet.js'

    import { defineProps } from 'vue';

    const props = defineProps({
        test: {
            type: String,
            required: true
        }
    });

    // Références pour les scripts ajoutés
    const jqueryScript = ref(null);
    const customScript = ref(null);
    let learning = ref(null)

    const consonne = [
        ['ก', 'K', 'Koo Kai', 'poulet', '#E08913', 'chicken.jpg', 'ก ไก่'], 
        ['ฉ', 'CH', 'Choo Ching', 'cymbale', '#F9D541', 'cymbale.jpg', 'ฉ ฉิ่ง'], 
        ['ด', 'D', 'Doo Dek', 'enfant', '#CB8E65', 'enfant.jpg', 'ด เด็ก'],
        ['ข', 'KH', 'Khoo kai', 'Oeuf', '#DB914F', 'oeuf.webp', 'ข ไข่'],
        ['จ', 'DJ', 'Djoo Djan', 'Plat', '#DCE0DF', 'plat.jpg', 'จ จาน'],
        ['น', 'N', 'Noo Nhuu', 'souris', '#735539', 'Souris.webp', 'น หนู'],
        ['ว', 'W', 'Wor Whean', 'bague', '#D2D2D2', 'bague.jpg', 'ว แหวน'],
        ['ฌ', 'CH', 'Choo Cher', 'Arbre', '#52770A', 'arbre.jpg', 'ฌ เฌอ'],
        ['ฆ', 'KH', 'Khoo Rakang', 'Cloche', '#E9AA37', 'cloche.jpg', 'ฆ ระฆัง'],
        ['ถ', 'TH', 'Thoo Thung', 'Sac', '#2A65E5', 'sac.jpg', 'ถ ถุง'],
        ['ฒ', 'T', 'Too Phu Tao', 'Ainé', '#E3E5E7', 'aine.jpeg', 'ฒ ผู้เฒ่า'],
        ['ผ', 'PH', 'Phoo Phung', 'Abeille', '#F6DF3A', 'abeille.webp', 'ผ ผึ้ง'],
        ['ค', 'KH', 'Khoo Khwai', 'Buffle', '#54535B', 'buffle.webp', 'ค ควาย'],
        ['ฟ', 'F', 'Foo Fan', 'Dent', '#F7F7F7', 'dent.jpg', 'ฟ ฟัน'],
        ['ศ', 'S', 'Soe Sala', 'Pavillon', '#7E480F', 'pavillon.jpg', 'ศ ศาลา'],
    ];

    // alphabet = new Alphabet(tableauConsonne);

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

    const alphabetStore = useAlphabetStore()
    const test = "1"

    const handleClick = (item) => {
        console.log('La valeur de item.value est :', item.value)
        alphabetStore.changeStep('step-' + item.value)
    }

    onMounted(() => {
        jqueryScript.value = document.createElement('script');
        jqueryScript.value.src = "https://code.jquery.com/jquery-3.7.1.min.js";
        jqueryScript.value.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
        jqueryScript.value.crossOrigin = "anonymous";
        jqueryScript.value.async = true;
        document.body.appendChild(jqueryScript.value);

        jqueryScript.value.onload = () => {
            console.log("jQuery chargé, maintenant je charge learning.js");

            learning = new learningClass(tableauConsonne);

            $('.card').on('click', function(e){
            //this n'est pas l'objet en question car on est dans un évènement
                console.log($(e.target).attr('value'))
                if ($(e.target).attr('value') == "true")
                {
                    learning.greatAnswer();
                    learning.start();
                }else{
                    learning.wrongAnswer();
                    learning.start();
                }
            })
                
            $('#learn-letter').on('click', function(){
                learning.learnLetter();

                $('#input-consonne').css({
                    fontSize: '100px'
                })

                learning.start()
            })

            $('#learn-letter-e').on('click', function(){
                learning.learnLetterE();

                $('#input-consonne').css({
                    fontSize: '100px'
                })

                learning.start()
            })

            $('#learn-exemple').on('click', function(){
                learning.learnExemple();

                $('#input-consonne').css({
                    fontSize: '60px'
                })

                learning.start()
            })
            
            learning.shakeTheArray();
            learning.start();
        };
    })

    

</script>