<template>
    <div class="v-col-lg-3 v-col-12"> 
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          class="mx-auto"
          max-width="344"
          v-bind="props"
          to="apprendre-alphabet-thai"
        >
          <v-img src="/images/application-apprendre-alphabet-thai.png"></v-img>
  
          <v-card-text>
            <h2 class="text-h6 text-primary">
              Apprendre l'alphabet Thailandais
            </h2>
            Apprenez l'alphabet thaï en jouant ! Choisissez la bonne carte dans une série de tests progressifs, conçus pour vous faire mémoriser facilement les caractères et leur prononciation.
          </v-card-text>
  
          <v-overlay
            :model-value="!!isHovering"
            class="align-center justify-center"
            scrim="#036358"
            contained
          >
            <v-btn variant="flat" to="apprendre-alphabet-thai">Pratiquez</v-btn>
          </v-overlay>
        </v-card>
      </v-hover>
    </div>
  </template>