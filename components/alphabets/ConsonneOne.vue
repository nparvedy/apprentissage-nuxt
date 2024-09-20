<template>
    <h1>Apprendre l'alphabet Thai</h1>
    <h2 >Pour commencer les consonnes</h2>
    <div class="d-flex justify-center">
        <div class="square">
            <p id="input-consonne" style="text-align: center;width:100%"></p>
            <!--<p style="margin-right:5px;">Indice : </p>-->
            <p id="result-indice"></p>
        </div> 
    </div>
    
    <div style="display:flex;flex-direction:column">
        <p style="margin-bottom:0;margin-top:20px;text-align:center;">Veuillez choisir une carte : </p>
        <div class="card-consonne">

        </div>
    </div>
    <h2 style="font-size:30px;margin-bottom:10px;margin-top:10px;">Résultat : </h2>
    <p id="result"></p>
</template>

<style scoped>
    .center{
        display:flex;flex-direction:column;max-width: 600px;margin: auto;align-items: center;justify-content: center;
    }

    #input-consonne{
        font-size:80px;
        border:none;
        background-color:#fdfdfd;
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
</style>