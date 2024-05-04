<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, onUnmounted, ref } from 'vue';
import { useGlobalStore } from '../store';

const store = useGlobalStore();
const radius = 100;
const magneticField = ref<HTMLElement | null>(null);
const helper = ref<HTMLElement | null>(null);

const handleMouseMove = (e: MouseEvent) => {
    if (magneticField.value &&  helper.value) {
        const fieldRect = magneticField.value.getBoundingClientRect();

        const center = {
            x: fieldRect.left + fieldRect.width / 2,
            y: fieldRect.top + fieldRect.height / 2,
        }

        const dx = e.clientX - center.x;
        const dy = e.clientY - center.y;
        const theta = Math.atan2(dx, dy);
        console.log(theta);
        const tan = Math.tan(theta);
        let x,y: number;

        if (Math.abs(tan) > fieldRect.height / fieldRect.width) {
            y = dy < 0 ? fieldRect.top : fieldRect.top + fieldRect.height;
            x = center.x + (y - center.y) / tan;
        } else {
            x = dx < 0 ? fieldRect.left : fieldRect.left + fieldRect.width;
            y = center.y + tan * (x - center.x)
        }

        x = Math.max(fieldRect.left, Math.min(x, fieldRect.left + fieldRect.width));
        y = Math.max(fieldRect.top, Math.min(y, fieldRect.top + fieldRect.height));

        gsap.to(helper.value, {
            duration: .01,
            x: x,
            y: y,
            ease: 'power1.out'
        });

        store.setMagneticFieldRadius(radius);
        store.setMagneticFieldCenter(center);
    }
}


onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove);
})

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
})

</script>

<template>
    <div class="helper" ref="helper"></div>
    <div class="magnetic-field" ref="magneticField">
        <slot></slot>
    </div>
</template>

<style scoped>
    .magnetic-field {
        @apply relative;
    }

    .helper {
        @apply fixed bg-red-600 size-2 rounded-full;
    }
</style>