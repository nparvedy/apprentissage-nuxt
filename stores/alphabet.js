import { defineStore } from 'pinia';

export const useAlphabetStore = defineStore('alphabet', {
  state: () => ({
    showAlphabet: false,
    step: 'step-1'
  }),
  actions: {
    toggleAlphabet() {
      this.showAlphabet = true;
    },
    changeStep(value)
    {
      this.step = value;
    }
  },
});
