
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function multiplierPlusieursFois(nombreInitial, facteur, repetitions) {
        let resultat = nombreInitial;

        for (let i = 0; i < repetitions; i++) {
            resultat *= facteur;
        }

        return resultat;
    }

    function tirerCartes(cartes, n = 1) {
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

