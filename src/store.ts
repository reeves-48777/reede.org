import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
    const modCursor = ref(false);

    function setModCursor(mod: boolean) {
        console.log("set mod cursor to : ", mod);
        modCursor.value = mod;
    } 

    return { modCursor, setModCursor };
})