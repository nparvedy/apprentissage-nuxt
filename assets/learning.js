export default class Learning{
    input = 'letter';
    indice = 'exemple';
    result = 'letterE';
    AlphabetActived = 3;
    score = 0;
    continueToWork = false;
    mode = 0;
    startValidateMode = false;
    countForValidateMode = 0;
    validateMode = false;
    removeColor = false;
    size = '60px'
    difficulty = 1;
    countGoodAnswer = 0;
    
    constructor(alphabet, lastNumber = 999999)
    {
        this.alphabet = alphabet;
        this.lastNumber = lastNumber;
        this.learning = this;
    }
    //fait
    resetScore(){
        // Parcourir chaque sous-tableau
        for (let i = 0; i < this.alphabet.length; i++) {
            // Réinitialiser le score (ici, l'élément à l'index 1) à 0
            this.alphabet[i]['score'] = 0;
        }
    }
    //fait
    checkIfLetterExist(letter, array) {
        if (!array.includes(letter)) {
            return false;
        } else {
            return true;
        }
    }
    //fait
    greatAnswer(){
        $('#result').text('Bonne réponse !')
        $('#result').css('color', 'green');

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
                console.log("validate compteur :", this.countForValidateMode)
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
    }
    //fait
    wrongAnswer(){
        $('#result').text('Mauvaise réponse !')
        $('#result').css('color', 'red');

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
    }
    //fait
    hideIndice(){
        $('#result-indice').css('display', 'none');
    }
    //fait
    showIndice(){
        $('#result-indice').css('display', 'block');
    }

    //utiliser les fonctionnalité de nuxt pour cette partie
    createEventStart(){
        const self = this;
        $('.card').on('click', function(e){
        //this n'est pas l'objet en question car on est dans un évènement
        console.log(self);
            console.log($(e.target).attr('value'))
            if ($(e.target).attr('value') == "true")
            {
                self.greatAnswer();
                self.start();
            }else{
                self.wrongAnswer();
                self.start();
            }
        })

        if (this.continueToWork == true && this.mode != 5 && this.removeColor == false)
        {
            $('.card').on('mouseover', function(e){
                let pathPicture = 'images/' + $(this).attr('pathPicture');
                $(this).css({
                    backgroundImage: `url(${pathPicture})`,
                    backgroundSize: 'cover'
                })
            })

            $('.card').on('mouseout', function(e){
                $(this).css({
                    backgroundImage: '',
                    backgroundSize: ''
                })
            })
        }
    }

    //fait
    learnLetterE(){
        this.input = 'letterE';
        this.indice = 'exemple';
        this.result = 'letter';
        this.size = '60px'
    }
    //fait
    learnLetter(){
        this.input = 'letter';
        this.indice = 'exemple';
        this.result = 'letterE';
        this.size = '60px'
    }
    //fait
    learnExemple(){
        this.input = 'exemple';
        this.indice = 'exempleTranslated';
        this.result = 'letter';
        this.size = '60px'
    }
    //fait
    learnWord(){
        this.input = 'word';
        this.indice = '';
        this.result = 'exemple';
        this.size = '20px'
    }
    //fait
    learnPicture(){
        this.input = 'pathPicture';
        this.indice = '';
        this.result = 'letter';
        this.size = '60px'
    }
    //fait
    learnWithPicture(){
        this.input = 'letter';
        this.indice = '';
        this.result = 'pathPicture';
    }
    //fait
    shakeTheArray(){
        let taille = this.alphabet.length;
        let decalage = 3 * Math.floor(Math.random() * Math.floor(taille / 3));

        // Réorganisation du tableau
        this.alphabet = this.alphabet.slice(decalage).concat(this.alphabet.slice(0, decalage));
    }

    //text-align: center;width:100%;background-image: url(images/chicken.jpg);background-size: cover;height: 150px;width: 150px;
    //fait
    getPathPicture(){
        return this.alphabet[this.lastNumber]['pathPicture']
    }
    //fait
    whatMode(score){
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
    }

    start(){
        $('.card-consonne').empty();

        let arrayPronostic = [];

        for (let i = 0; i < this.AlphabetActived; i++)
        {
            arrayPronostic.push(multiplierPlusieursFois(1, 0.8, this.alphabet[i]['score']))
        }

        //On reset une fois qu'on a le nouveau tableau des pronostic sinon ça additionne l'ancien alphabetActived
        this.AlphabetActived = 3;

        //on annule le final stage

        // for (let i = 0; i < arrayPronostic.length; i++)
        // {
        //     if (arrayPronostic[i] <= 0.2097152)
        //     {
        //         this.AlphabetActived++;
        //     }

        //     if (this.AlphabetActived > this.alphabet.length)
        //     {
        //         this.AlphabetActived = this.alphabet.length;
        //     }
        // }
        
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
            $('#result-indice').text('');
        }else if (this.mode == 2){
            $('#result-indice').text(this.alphabet[randomNumber][this.indice])
        }else if (this.mode == 4){
            $('#result-indice').text('')
        }else {
            $('#result-indice').text(this.alphabet[randomNumber][this.indice] +  ' (' + this.alphabet[randomNumber]['exempleTranslated'] + ')')
        }

        $('#input-consonne').text(this.alphabet[randomNumber][this.input])
        let result = this.alphabet[randomNumber][this.result]

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

                if (this.mode == 3)
                {
                    $('#input-consonne').text('');
                    $('#input-consonne').css({
                        backgroundImage: 'url(images/'+ this.alphabet[randomNumber]['pathPicture'] + ')',
                        backgroundSize: 'cover',
                        height: '150px',
                        width: '150px',
                    })

                    $('.card-consonne').append(`
                        <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)" class="card" value="true" pathPicture="${pathPicture}">
                            <p style="text-transform:uppercase;font-weight:bold;font-size: ${this.size};text-transform:uppercase;font-weight:bold;    padding: 12px 20px;" class="card"  value="true" pathPicture="${pathPicture}">${result}</p>
                        </div>
                    `);
                }else if (this.mode == 5){
                    $('#input-consonne').css({
                        backgroundImage: '',
                        backgroundSize: '',
                        height: '',
                        width: '100%',
                    })

                    let url = 'url(images/'+ this.alphabet[randomNumber]['pathPicture'] + ')';

                    $('.card-consonne').append(`
                        <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);background-image: ${url};background-size:cover;width: 100px;height: 100px;" class="card" click="handleCardClick() value="true" pathPicture="${pathPicture}">
                        </div>
                    `);
                }else {
                    $('#input-consonne').css({
                        backgroundImage: '',
                        backgroundSize: '',
                        height: '',
                        width: '100%',
                    })

                    $('.card-consonne').append(`
                        <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)" class="card" click="handleCardClick() value="true" pathPicture="${pathPicture}">
                            <p style="text-transform:uppercase;font-weight:bold;font-size: ${this.size};text-transform:uppercase;font-weight:bold;padding: 12px 20px;" class="card" click="handleCardClick() value="true" pathPicture="${pathPicture}">${result}</p>
                        </div>
                    `);
                }

                arraySelected.push(result);
            }else{
                let letterRandomId = getRandomInteger(0, this.alphabet.length);

                console.log("b", this.result)
                
                while (this.checkIfLetterExist(this.alphabet[letterRandomId][this.result], arraySelected))
                {
                    letterRandomId = getRandomInteger(0, this.alphabet.length);
                }

                let letterRandom = this.alphabet[letterRandomId][this.result]

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

                    $('.card-consonne').append(`
                        <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);background-image: ${url};background-size:cover;width:100px;height:100px" class="card" click="handleCardClick() value="true" pathPicture="${pathPicture}">
                        </div>
                    `);
                }else {
                    $('.card-consonne').append(`
                        <div style="color:white;font-size:30px;background-color:${color};margin:20px;display: flex;align-items: center;justify-content: center;border-radius:20px;cursor:pointer;box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)" class="card" click="handleCardClick() value="false" pathPicture="${pathPicture}">
                            <p style="text-transform:uppercase;font-weight:bold;font-size: ${this.size};text-transform:uppercase;font-weight:bold;    padding: 12px 20px;" class="card" click="handleCardClick() value="false" pathPicture="${pathPicture}">${letterRandom}</p>
                        </div>
                    `);
                }
                
            }
        }

        this.createEventStart()
    }
}

const multiplierPlusieursFois = (nombreInitial, facteur, repetitions) =>{
    let resultat = nombreInitial;

    for (let i = 0; i < repetitions; i++) {
        resultat *= facteur;
    }

    return resultat;
}

const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const tirerCartes = (cartes, n = 1) => {
    // Calcul du poids total
    // console.log(cartes)
    let totalPoids = Object.values(cartes).reduce((acc, poids) => acc + poids, 0);
    
    // Calcul des probabilités pour chaque carte
    let probabilites = {};
    for (let carte in cartes) {
        probabilites[carte] = cartes[carte] / totalPoids;
    }

    // Sélectionner 'n' cartes selon leurs probabilités
    let tirage = [];
    for (let i = 0; i < n; i++) {
        let rand = Math.random();
        let sommeCumulative = 0;

        for (let carte in probabilites) {
            sommeCumulative += probabilites[carte];
            if (rand < sommeCumulative) {
                tirage.push(carte);
                break;
            }
        }
    }
    
    return parseInt(tirage);
}

// const createEventStart = () => {
//     $('.card').on('click', function(e){
//         console.log($(e.target).attr('value'))
//         if ($(e.target).attr('value') == "true")
//         {
//             this.learning.greatAnswer();
//             this.learning.start();
//         }else{
//             this.learning.wrongAnswer();
//             this.learning.start();
//         }
//     })
// }