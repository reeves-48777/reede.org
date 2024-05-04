import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGlobalStore = defineStore('global', () => {
    const magneticField = reactive({
        center: {x: 0, y: 0},
        radius: 100,
    });

    function setMagneticFieldCenter(centerPos: {x: number, y: number}) {
         magneticField.center = centerPos;
    }

    function setMagneticFieldRadius(radius: number) {
        magneticField.radius = radius;
    }

    return { magneticField, setMagneticFieldCenter, setMagneticFieldRadius };
})