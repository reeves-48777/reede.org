<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { gsap } from 'gsap';

const outer = ref<HTMLElement | null>(null);
const inner = ref<HTMLElement | null>(null);

const outerDuration = .4;
const innerDuration = .2;
const colorChangeDuration = .06;

const handleMouseMove = (event: MouseEvent) => {
    if (outer.value && inner.value) {

        const outerRect = outer.value.getBoundingClientRect();
        const innerRect = inner.value.getBoundingClientRect();

        const cursor = { x: event.clientX, y: event.clientY };
        const outerPosition = {x: cursor.x - outerRect.width/2, y: cursor.y - outerRect.height/2}
        const innerPosition = {x: cursor.x - innerRect.width/2, y: cursor.y - innerRect.height/2};

        // outer part
        gsap.to(outer.value, {
            duration: outerDuration,
            ease: 'power1.out',
            left: outerPosition.x,
            top: outerPosition.y,

        });

        // inner part
        gsap.to(inner.value, {
            duration: innerDuration,
            ease: 'power1.out',
            left: innerPosition.x,
            top: innerPosition.y,
        });

        const below = document.elementFromPoint(cursor.x, cursor.y);
        if (below?.classList.contains('mod-cursor')) {
            handleMouseOver();
        } else {
            handleMouseOut();
        }
    }
};

const handleMouseOver = () => {
    if (outer.value) {
        gsap.to(outer.value, {
            scale: 1.5,
            outlineColor: 'black',
            duration: colorChangeDuration
        });

        gsap.to(inner.value, {
            backgroundColor: 'black',
            scale: 1.2,
            duration: colorChangeDuration
        });
    }
};

const handleMouseOut = () => {
    if (outer.value) {
        gsap.to(outer.value, {
            scale: 1,
            outlineColor: 'white',
            duration: colorChangeDuration
        });

        gsap.to(inner.value, {
            backgroundColor: 'white',
            scale: 1,
            duration: colorChangeDuration
        });
    }
}

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
});


</script>

<template>
    <div class="outer" ref="outer"></div>
    <div class="inner" ref="inner"></div>
</template>

<style scoped>
    .outer, .inner {
        @apply fixed rounded-full origin-center z-50
    }    
    .outer {
        @apply bg-transparent size-[8px] outline outline-2 outline-offset-[6px] outline-white;
    }
    .inner {
        @apply bg-white size-[6px];
    }
</style>