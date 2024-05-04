<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, onUnmounted, ref } from 'vue';

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

        // const dx = e.pageX - center.x;
        // const dy = center.y - e.pageY;
        // const theta = Math.atan2(dy, dx);
        // const tan = Math.tan(theta);
        // let x,y: number;

        // if (Math.abs(tan) > fieldRect.height / fieldRect.width) {
        //     // top/bottom
        //     y = dy < 0 ? fieldRect.top : fieldRect.top + fieldRect.height;
        //     x = center.x + (y - center.y) / tan;
        // } else {
        //     // left/right
        //     x = dx < 0 ? fieldRect.left : fieldRect.left + fieldRect.width;
        //     y = center.y + tan * (x - center.x)
        // }

        // x = Math.max(fieldRect.left, Math.min(x, fieldRect.right));
        // y = Math.max(fieldRect.top, Math.min(y, fieldRect.bottom));

        // console.log(fieldRect.left, fieldRect.right);
        // console.log(fieldRect.top, fieldRect.bottom);
        // console.log(x, y);

        // gsap.to(helper.value, {
        //     duration: .01,
        //     x: x,
        //     y: y,
        //     ease: 'power1.out'
        // });
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
        @apply absolute bg-red-600 size-2 rounded-full z-50 left-1/2 top-1/2;
    }
</style>