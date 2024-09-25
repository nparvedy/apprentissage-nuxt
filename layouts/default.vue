<template>
   <v-app>
        <v-layout>
            <core-drawer />
            <core-app-bar />
            <core-view>
                <slot></slot>
            </core-view>
        </v-layout>
   </v-app> 
</template>

<style>
.page-enter-active,
.page-leave-active {
  /* transition: all 0.4s; */
  transition: transform 0.7s ease, opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateX(100%); /* Descend vers le bas */
}
</style>