<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useGlobalStore } from '../store';
import { gsap } from 'gsap';

const store = useGlobalStore();

const outer = ref<HTMLElement | null>(null);
const inner = ref<HTMLElement | null>(null);
const position = ref({x: 0, y: 0});

const outerDuration = .4;
const innerDuration = .2;
const colorChangeDuration = .06;

let rafId: number;

const updateCursorPosition = () => {
    if (outer.value && inner.value) {
        const outerRect = outer.value.getBoundingClientRect();
        const innerRect = inner.value.getBoundingClientRect();

        const outerPosition = {x: position.value.x - outerRect.width/2, y: position.value.y - outerRect.height/2};
        const innerPosition = {x: position.value.x - innerRect.width/2, y: position.value.y - innerRect.height/2};

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

        if (store.modCursor) {
            handleMouseOver();
        } else {
            handleMouseOut();
        }
    }
    rafId = requestAnimationFrame(updateCursorPosition);
}

const handleMouseMove = (event: MouseEvent) => {
    position.value = {x: event.clientX, y: event.clientY};
    if (!rafId) {
        rafId = requestAnimationFrame(updateCursorPosition);
    }
};

const handleMouseOver = () => {
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
};

const handleMouseOut = () => {
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

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    gsap.killTweensOf(outer.value);
    gsap.killTweensOf(inner.value);
    // cancelAnimationFrame(rafId);
});


</script>

<template>
    <div class="outer" ref="outer"></div>
    <div class="inner" ref="inner"></div>
</template>

<style scoped>
    .outer, .inner {
        @apply fixed rounded-full origin-center pointer-events-none z-50
    }    
    .outer {
        @apply bg-transparent size-[8px] outline outline-2 outline-offset-[6px] outline-white left-1/2 top-1/2;
    }
    .inner {
        @apply bg-white size-[6px] left-1/2 top-1/2;
    }
</style>