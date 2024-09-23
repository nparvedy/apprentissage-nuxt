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