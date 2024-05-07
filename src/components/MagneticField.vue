<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, onUnmounted, ref } from 'vue';

const radius = 100;

const magneticField = ref<HTMLElement | null>(null);
const helper = ref<HTMLElement | null>(null);

const handleMouseMove = (e: MouseEvent) => {
    if (magneticField.value &&  helper.value) {
        const rect = magneticField.value.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2

        const dx = e.clientX - centerX;
        const dy = centerY - e.clientY;
        const angle = Math.atan2(dy, dx);
        const tan = Math.tan(angle);

        let x,y: number;

        if (Math.abs(tan) > rect.height / rect.width) {
            // top/bottom
            y = dy < 0 ? rect.top : rect.top + rect.height;
            x = centerX + (y - centerY) / tan;
        } else {
            // left/right
            x = dx < 0 ? rect.left : rect.left + rect.width;
            y = centerY + tan * (x - centerX)
        }

        x = Math.max(rect.left, Math.min(x, rect.right));
        y = Math.max(rect.top, Math.min(y, rect.bottom));

        // console.log(fieldRect.left, fieldRect.right);
        // console.log(fieldRect.top, fieldRect.bottom);
        // console.log(x, y);

        gsap.to(helper.value, {
            duration: .01,
            x: x,
            y: y,
            ease: 'power1.out'
        });
        // gsap.to(helper.value, {
        //     x: center.x,
        //     y: center.y
        // })

        // store.setMagneticFieldRadius(radius);
        // store.setMagneticFieldCenter(center);
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
    <div class="magnetic-field" ref="magneticField">
        <div class="helper" ref="helper"></div>
        <slot></slot>
    </div>
</template>

<style scoped>
    .magnetic-field {
        @apply relative;
    }

    .helper {
        @apply absolute bg-red-600 size-2 rounded-full z-50 left-1/2 top-1/2 pointer-events-none;
    }
</style>