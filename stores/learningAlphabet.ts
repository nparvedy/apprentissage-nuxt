import { defineStore } from 'pinia';
import Alphabet  from '@/assets/Alphabet.js';
import { multiplierPlusieursFois, getRandomInteger, tirerCartes } from '@/assets/AlphabetFuntions.js'

export const useLearningAlphabetStore = defineStore('learning-alphabet', {
  state: () => ({
    input: 'letter',
    indice: 'exemple',
    result: 'letterE',
    AlphabetActived: 3,
    score: 0,
    continueToWork: false,
    mode: 0,
    startValidateMode: false,
    countForValidateMode: 0,
    validateMode: false,
    removeColor: false,
    size: '60px',
    difficulty: 1,
    countGoodAnswer: 0,
    alphabet: [] as Alphabet[],
    lastNumber: 0,
    cardResult: ["", "", ""]
  }),
  actions: {
    setAlphabet(value: Alphabet[]){
        this.alphabet = value;
    },
    
    resetScore(){
        // Parcourir chaque sous-tableau
        for (let i = 0; i < this.alphabet.length; i++) {
            // Réinitialiser le score (ici, l'élément à l'index 1) à 0
            this.alphabet[i].score = 0;
        }
    },

    checkIfLetterExist(letter: string, array: Array<string>) {
        if (!array.includes(letter)) {
            return false;
        } else {
            return true;
        }
    },

    greatAnswer(){
        //ne pas oublier de charger le résultat
        // $('#result').text('Bonne réponse !')
        // $('#result').css('color', 'green');

        this.alphabet[this.lastNumber]['score']++;
        this.countGoodAnswer++;

        if (this.countGoodAnswer == 6)
        {
            this.countGoodAnswer = 0;
            if (this.difficulty != 1)
            {
                this.difficulty--;
            }
        }

        if (this.continueToWork == false)
        {
            this.score++;

            if (this.score == 6)
            {
                this.resetScore()
                this.shakeTheArray()
                this.score = 0;
            }
        }else {
            if (this.startValidateMode && this.mode == 5)
            {
                this.countForValidateMode++;
    
                if (this.countForValidateMode == 6)
                {
                    this.validateMode = true;
                    this.countForValidateMode = 0;
                    this.startValidateMode = false;
                    this.continueToWork = false;
                }
            }
        }
    },

    wrongAnswer(){
        // $('#result').text('Mauvaise réponse !')
        // $('#result').css('color', 'red');

        this.alphabet[this.lastNumber]['score'] = 0;
        console.log(this.alphabet[this.lastNumber])
        this.score = 0;

        if (this.continueToWork == false)
        {
            this.continueToWork = true;
        }

        this.difficulty = this.difficulty++;
        this.countGoodAnswer = 0;
        if (this.countForValidateMode > 1)
        {
            this.countForValidateMode = this.countForValidateMode - 2;
        }
    },

    hideIndice(){
        console.log('fait en sorte de cacher les indices')
        // $('#result-indice').css('display', 'none');
    },

    showIndice(){
        console.log('fait en sorte d\'afficher les indices')
        // $('#result-indice').css('display', 'block');
    },
    
    learnLetterE(){
        this.input = 'letterE';
        this.indice = 'exemple';
        this.result = 'letter';
        this.size = '60px'
    },

    learnLetter(){
        this.input = 'letter';
        this.indice = 'exemple';
        this.result = 'letterE';
        this.size = '60px'
    },

    learnExemple(){
        this.input = 'exemple';
        this.indice = 'exempleTranslated';
        this.result = 'letter';
        this.size = '60px'
    },

    learnWord(){
        this.input = 'word';
        this.indice = '';
        this.result = 'exemple';
        this.size = '20px'
    },

    learnPicture(){
        this.input = 'pathPicture';
        this.indice = '';
        this.result = 'letter';
        this.size = '60px'
    },

    learnWithPicture(){
        this.input = 'letter';
        this.indice = '';
        this.result = 'pathPicture';
    },

    shakeTheArray(){
        let taille = this.alphabet.length;
        let decalage = 3 * Math.floor(Math.random() * Math.floor(taille / 3));

        // Réorganisation du tableau
        this.alphabet = this.alphabet.slice(decalage).concat(this.alphabet.slice(0, decalage));
    },

    getPathPicture(){
        return this.alphabet[this.lastNumber]['pathPicture']
    },

    whatMode(score: number){
        if (this.continueToWork == false)
        {
            this.learnPicture()
            return 3;
        }else {
            let divid = this.difficulty * 6;
            this.mode = (score % 18) / this.difficulty;

            console.log(this.difficulty, divid, this.mode)

            switch (Math.floor(this.mode)) {
                case 0:
                    this.learnLetter()
                    this.removeColor = false;
                    return 0; // Pour les scores 0, 3, 6, 9
                case 1:
                    this.learnLetterE()
                    this.removeColor = false;
                    return 1; // Pour les scores 1, 4, 7, 10
                case 2:
                    this.learnExemple()
                    this.removeColor = false;
                    return 2; // Pour les scores 2, 5, 8, 11
                case 3:
                    this.learnPicture()
                    this.removeColor = true;
                    return 3; // Pour les scores 15 (mod 0), 16 (mod 1), 17 (mod 2)
                case 4:
                    this.learnWord()
                    this.removeColor = true;
                    return 4
                case 5:
                    this.learnWithPicture()
                    this.startValidateMode = true;
                    return 5;
                default:
                if (this.mode > 5)
                {
                    this.learnWithPicture()
                    this.startValidateMode = true;
                    return 5;
                }else {
                    this.learnLetter()
                    this.removeColor = false;
                    return 1; // Par sécurité, au cas où
                }
            }
        }
    },

    start(){
        // $('.card-consonne').empty();

        let arrayPronostic = [];

        for (let i = 0; i < this.AlphabetActived; i++)
        {
            arrayPronostic.push(multiplierPlusieursFois(1, 0.8, this.alphabet[i]['score']))
        }

        //On reset une fois qu'on a le nouveau tableau des pronostic sinon ça additionne l'ancien alphabetActived
        this.AlphabetActived = 3;
        
        let randomNumber = tirerCartes(arrayPronostic)

        while (this.lastNumber == randomNumber)
        {
            randomNumber = tirerCartes(arrayPronostic)
        }

        this.lastNumber = randomNumber;

        //check what mode
        this.mode = this.whatMode(this.alphabet[randomNumber]['score']);

        if (this.mode == 3 || this.mode == 5)
        {
            // $('#result-indice').text('');
        }else if (this.mode == 2){
            // $('#result-indice').text(this.alphabet[randomNumber][this.indice])
        }else if (this.mode == 4){
            // $('#result-indice').text('')
        }else {
            // $('#result-indice').text(this.alphabet[randomNumber][this.indice] +  ' (' + this.alphabet[randomNumber]['exempleTranslated'] + ')')
        }

        // $('#input-consonne').text(this.alphabet[randomNumber][this.input])

        //on fonction du this.result, alors le résultat change
        // let result = this.alphabet[randomNumber][this.result]

        let resultProperty: keyof Alphabet = this.result as keyof Alphabet;
        let result = this.alphabet[randomNumber][resultProperty];

        let position = getRandomInteger(0, 3);
        let arraySelected = [];

        // arraySelected.push(result)
        for (var i = 0; i < 3; i++)
        {
            if (position == i)
            {
                let pathPicture = this.alphabet[randomNumber]['pathPicture'];
                let color = this.alphabet[randomNumber]['color'];

                if (this.removeColor)
                {
                    color = "#0078ff";
                }
                
                this.cardResult[i] = result;
                
                if (this.mode == 3)
                {
                    // $('#input-consonne').text('');
                    // $('#input-consonne').css({
                    //     backgroundImage: 'url(images/'+ this.alphabet[randomNumber]['pathPicture'] + ')',
                    //     backgroundSize: 'cover',
                    //     height: '150px',
                    //     width: '150px',
                    // })

                    // $('.card-consonne').append(`
                    //     <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)" class="card" value="true" pathPicture="${pathPicture}">
                    //         <p style="text-transform:uppercase;font-weight:bold;font-size: ${this.size};text-transform:uppercase;font-weight:bold;    padding: 12px 20px;" class="card"  value="true" pathPicture="${pathPicture}">${result}</p>
                    //     </div>
                    // `);
                }else if (this.mode == 5){
                    // $('#input-consonne').css({
                    //     backgroundImage: '',
                    //     backgroundSize: '',
                    //     height: '',
                    //     width: '100%',
                    // })

                    // let url = 'url(images/'+ this.alphabet[randomNumber]['pathPicture'] + ')';

                    // $('.card-consonne').append(`
                    //     <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);background-image: ${url};background-size:cover;width: 100px;height: 100px;" class="card" click="handleCardClick() value="true" pathPicture="${pathPicture}">
                    //     </div>
                    // `);
                }else {
                    // $('#input-consonne').css({
                    //     backgroundImage: '',
                    //     backgroundSize: '',
                    //     height: '',
                    //     width: '100%',
                    // })

                    // $('.card-consonne').append(`
                    //     <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)" class="card" click="handleCardClick() value="true" pathPicture="${pathPicture}">
                    //         <p style="text-transform:uppercase;font-weight:bold;font-size: ${this.size};text-transform:uppercase;font-weight:bold;padding: 12px 20px;" class="card" click="handleCardClick() value="true" pathPicture="${pathPicture}">${result}</p>
                    //     </div>
                    // `);
                }

                // arraySelected.push(result);
            }else{
                let letterRandomId = getRandomInteger(0, this.alphabet.length);

                //le résultat this.alphabet[letterRandomId][this.result], par exemple pathPicture
                let resultProperty: keyof Alphabet = this.result as keyof Alphabet;
                let result = this.alphabet[letterRandomId][resultProperty];

                this.cardResult[i] = result;

                // let result = this.alphabet[letterRandomId][this.result];
                
                while (this.checkIfLetterExist(result, arraySelected))
                {
                    letterRandomId = getRandomInteger(0, this.alphabet.length);
                }

                let letterRandom = result

                arraySelected.push(letterRandom);

                let pathPicture = this.alphabet[letterRandomId]['pathPicture'];
                let color = this.alphabet[letterRandomId]['color'];
                
                if (this.removeColor)
                {
                    color = "#0078ff";
                }

                if (this.mode == 5)
                {
                    let url = 'url(images/'+ pathPicture + ')';
                    //maintenant il faut assigner les propriété et le rendu sera automatique

                    // $('.card-consonne').append(`
                    //     <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);background-image: ${url};background-size:cover;width:100px;height:100px" class="card" click="handleCardClick() value="true" pathPicture="${pathPicture}">
                    //     </div>
                    // `);
                }else {
                    // $('.card-consonne').append(`
                    //     <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)" class="card" click="handleCardClick() value="false" pathPicture="${pathPicture}">
                    //         <p style="text-transform:uppercase;font-weight:bold;font-size: ${this.size};text-transform:uppercase;font-weight:bold;    padding: 12px 20px;" class="card" click="handleCardClick() value="false" pathPicture="${pathPicture}">${letterRandom}</p>
                    //     </div>
                    // `);
                }
                
            }
        }
    }

  },
  
});
