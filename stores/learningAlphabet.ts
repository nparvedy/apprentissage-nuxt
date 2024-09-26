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
    continueToWork: true,
    mode: 0,
    startValidateMode: false,
    countForValidateMode: 0,
    validateMode: false,
    removeColor: false,
    size: '60px',
    sizeInput: '60px',
    sizePCard: '60px',
    difficulty: 0,
    countGoodAnswer: 0,
    countBadAnswer: 0,
    alphabet: [] as Alphabet[],
    lastNumber: 0,
    inputValue: "",
    cardResult: ["", "", ""],
    cardValue: [false, false, false],
    cardNamePicture: ["", "", ""],
    cardPathPicture: ["", "", ""],
    resultReponse: false,
    startApplication: false,
    indiceResult: "",
    showHoverPicture: false,
    showAnyway: false,
    console: [] as string[]
  }),
  actions: {
    // Action pour sauvegarder l'état dans le local storage
    saveState() {
        localStorage.setItem('learning-alphabet', JSON.stringify(this.$state));
    },

    // Action pour charger l'état depuis le local storage
    loadState() {
        const savedState = localStorage.getItem('learning-alphabet');
        if (savedState) {
            const state = JSON.parse(savedState);
            Object.assign(this.$state, state);
        }
    },

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

    upDifficulty(value: boolean): void
    {
        if (value)
        {   
            this.difficulty++;

            //Si la difficulté dépasse le nombre de mode alors il ne peut pas augmenter
            if (this.difficulty > 5)
            {
                this.difficulty = 5;
            }
        }
        console.log(this.difficulty)
    },

    reduceDifficulty(value: boolean): void
    {
        if (value)
        {   
            this.difficulty--;

            //Si la difficulté passe en négative alors on repasse à 0, le niveau le plus bas
            if (this.difficulty == -1)
            {
                this.difficulty = 0;
            }
        }
        console.log(this.difficulty)
    },

    checkIfEnoughGoodAnswer(): boolean
    {
        if (this.countGoodAnswer == 6)
        {
            this.countGoodAnswer = 0;
            return true;
        }else {
            return false;
        }
    },

    checkIfEnoughBadAnswer(): boolean
    {
        //on repasse à 0 le compteur de bonne réponse
        this.countGoodAnswer = 0;

        if (this.countBadAnswer == 3)
        {
            this.countBadAnswer = 0;
            return true;
        }else {
            return false;
        }
    },

    greatAnswer()
    {
        //ne pas oublier de charger le résultat
        
        this.resultReponse = true;
        this.alphabet[this.lastNumber]['score']++;
        this.countGoodAnswer++;

        this.upDifficulty(this.checkIfEnoughGoodAnswer());

        if (this.continueToWork == false)
        {
            this.score++;

            if (this.score == 6)
            {
                this.resetScore()
                this.shakeTheArray()
                this.score = 0;
                this.difficulty = 0;
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

        //démarrage de la partie
        if (this.startApplication == false)
        {
            this.startApplication = true;
        }

        this.saveState();
    },

    wrongAnswer(){
        // $('#result').text('Mauvaise réponse !')
        // $('#result').css('color', 'red');
        this.countBadAnswer++;
        this.resultReponse = false;

        this.alphabet[this.lastNumber]['score'] = 0;
        this.score = 0;

        this.reduceDifficulty(this.checkIfEnoughBadAnswer());

        if (this.continueToWork == false)
        {
            this.continueToWork = true;
        }
        
        if (this.countForValidateMode > 1)
        {
            this.countForValidateMode = this.countForValidateMode - 2;
        }

        //démarrage de la partie
        if (this.startApplication == false)
        {
            this.startApplication = true;
        }

        this.saveState();
    },
    
    learnLetterE(){
        this.input = 'letterE';
        this.indice = 'exemple';
        this.result = 'letter';
        this.size = '60px';
        this.sizeInput = '80px';
        this.sizePCard = '60px';
        this.showHoverPicture = true;
        this.showAnyway = false;
    },

    learnLetter(){
        this.input = 'letter';
        this.indice = 'exemple';
        this.result = 'letterE';
        this.size = '60px';
        this.sizePCard = '60px';
        this.sizeInput = '80px';
        this.showHoverPicture = true;
        this.showAnyway = false;
    },

    learnExemple(){
        this.input = 'exemple';
        this.indice = 'exempleTranslated';
        this.result = 'letter';
        this.size = '60px';
        this.sizePCard = '80px';
        this.showHoverPicture = true;
        this.showAnyway = false;
    },

    learnWord(){
        this.input = 'word';
        this.indice = '';
        this.result = 'exemple';
        this.size = '20px'
        this.sizePCard = '30px';
        this.showHoverPicture = true;
        this.showAnyway = false;
    },

    learnPicture(){
        this.input = 'pathPicture';
        this.indice = '';
        this.result = 'letter';
        this.size = '60px'
        this.showHoverPicture = false;
        this.showAnyway = false;
        this.sizePCard = '80px'
    },

    learnWithPicture(){
        this.input = 'letter';
        this.indice = '';
        this.result = 'pathPicture';
        this.showHoverPicture = true;
        this.showAnyway = true;
    },

    shakeTheArray(){
        let taille = this.alphabet.length;
        let decalage = 3 * Math.floor(Math.random() * Math.floor(taille / 3));

        // Réorganisation du tableau
        this.alphabet = this.alphabet.slice(decalage).concat(this.alphabet.slice(0, decalage));
    },

    getPathPicture(name: string){
        let path = 'url(images/'+ name + ')';
        return path;
    },

    whatMode(){
        if (this.continueToWork == false)
        {
            this.learnPicture()
            return 3;
        }else {
            let divid = this.difficulty * 6;
            // this.mode = (score % 18) / this.difficulty;

            console.log("Le mode actuel", this.difficulty)

            switch (Math.floor(this.difficulty)) {
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

    checkAnswer(res: boolean){
        if (res == true)
        {
            this.greatAnswer();
            this.start();
        }else{
            this.wrongAnswer();
            this.start();
        }
    },

    start(){
        this.console = [];
        // $('.card-consonne').empty();
        this.whatMode();

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
        this.mode = this.whatMode();
        console.log("Le mode..", this.mode)

        //On transforme notre string en une variable, donc on fonction du résultat de this.indice, il sera considéré comme une clé
        let resultIndiceKey: keyof Alphabet = this.indice as keyof Alphabet;

        if (this.mode == 3 || this.mode == 5)
        {
            this.indiceResult = "";
            this.sizeInput = "80px"
        }else if (this.mode == 2){
            this.indiceResult = this.alphabet[randomNumber][resultIndiceKey];
            this.sizeInput = "30px"
        }else if (this.mode == 4){
            this.indiceResult = "";
        }else {
            this.indiceResult = this.alphabet[randomNumber][resultIndiceKey] +  ' (' + this.alphabet[randomNumber]['exempleTranslated'] + ')';
        }

        // $('#input-consonne').text(this.alphabet[randomNumber][this.input])
        let resultInputConsonne: keyof Alphabet = this.input as keyof Alphabet;
        this.inputValue = this.alphabet[randomNumber][resultInputConsonne];

        //on fonction du this.result, alors le résultat change
        // let result = this.alphabet[randomNumber][this.result]

        let resultProperty: keyof Alphabet = this.result as keyof Alphabet;
        let result = this.alphabet[randomNumber][resultProperty];

        let position = getRandomInteger(0, 3);
        let arraySelected = [];

        arraySelected.push(result)
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
                this.cardValue[i] = true;
                this.cardNamePicture[i] = pathPicture;

                console.log(this.cardResult[i], this.cardValue[i], this.cardNamePicture[i])
                
                if (this.mode == 3)
                {
                    let url = this.getPathPicture(this.alphabet[randomNumber]['pathPicture']);
                    
                    this.inputValue = url;
                    if (this.showHoverPicture)
                    {
                        this.cardPathPicture[i] = url;
                    }else {
                        this.cardPathPicture[i] = ""
                    }

                }else if (this.mode == 5){
                    this.cardResult = ["", "", ""];
                    let url = 'url(images/'+ this.alphabet[randomNumber]['pathPicture'] + ')';
                    this.cardPathPicture[i] = url;
                    if (this.showHoverPicture)
                    {
                        this.cardPathPicture[i] = url;
                    }else {
                        this.cardPathPicture[i] = ""
                    }
                }else {
                    //pas sur de cette ligne
                    let url = 'url(images/'+ pathPicture + ')';
                    this.cardPathPicture[i] = url;
                    if (this.showHoverPicture)
                    {
                        this.cardPathPicture[i] = url;
                    }else {
                        this.cardPathPicture[i] = ""
                    }
                }

                arraySelected.push(result);
            }else{
                let letterRandomId = getRandomInteger(0, this.alphabet.length);

                //le résultat this.alphabet[letterRandomId][this.result], par exemple pathPicture
                let resultProperty: keyof Alphabet = this.result as keyof Alphabet;
                let result = this.alphabet[letterRandomId][resultProperty];

                this.cardValue[i] = false;
                // let result = this.alphabet[letterRandomId][this.result];
                let z = 0;
                
                while (this.checkIfLetterExist(this.alphabet[letterRandomId][resultProperty], arraySelected))
                {
                    z++;
                    letterRandomId = getRandomInteger(0, this.alphabet.length);
                    //juste par sécurité pour éviter les boucles infini en cas d'erreur de syntaxe
                    if (z > 10)
                    {
                        console.log("Je répète Z", z, result, arraySelected);
                        return;
                    }
                }

                let letterRandom = this.alphabet[letterRandomId][resultProperty]

                // let letterRandom = result

                arraySelected.push(letterRandom);

                let pathPicture = this.alphabet[letterRandomId]['pathPicture'];
                this.cardNamePicture[i] = pathPicture;
                
                this.cardResult[i] = letterRandom;
                
                let color = this.alphabet[letterRandomId]['color'];
                
                if (this.removeColor)
                {
                    color = "#0078ff";
                }

                if (this.mode == 5)
                {
                    let url = 'url(images/'+ pathPicture + ')';
                    this.cardPathPicture[i] = url;
                    this.cardResult = ["", "", ""];
                    if (this.showHoverPicture)
                    {
                        this.cardPathPicture[i] = url;
                    }else {
                        this.cardPathPicture[i] = ""
                    }
                }else {
                    let url = 'url(images/'+ pathPicture + ')';
                    this.cardPathPicture[i] = url;
                    if (this.showHoverPicture)
                    {
                        this.cardPathPicture[i] = url;
                    }else {
                        this.cardPathPicture[i] = ""
                    }
                }
            }
        }
    }

  },
  
});
