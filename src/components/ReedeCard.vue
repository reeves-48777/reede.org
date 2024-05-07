<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const maxAngle = 40;
const card = ref<HTMLElement | null>(null);

const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    if (card.value) {
        const rect = card.value.getBoundingClientRect();

        const cardCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        const mouse = {
            x: event.pageX - cardCenter.x,
            y: cardCenter.y - event.pageY 
        };

        const rotate = {
            x: (mouse.y / cardCenter.y) * maxAngle,
            y: -(mouse.x / cardCenter.x) * maxAngle
        };

        gsap.to(card.value, {
            duration: .5,
            ease: 'power1.out',
            rotateX: rotate.x,
            rotateY: rotate.y
        });
    }
};

const resetTransform = () => {
    if (card.value) {
        gsap.to(card.value, {
            duration: .5,
            rotationX: 0,
            rotationY: 0,
            ease: 'power1.out'
        });
    }
};


</script>
<template>
    <div class="card" @mousemove="handleMouseMove" @mouseleave="resetTransform" ref="card">
        <slot class="pointer-events-none"></slot>
    </div>
</template>
<style scoped>
    .card {
        @apply w-72 h-96 bg-white rounded-xl text-black shadow-inner will-change-transform pointer-events-auto;
        transition: transform linear 0.1s;
        transform-style: preserve-3d;
        perspective: 1000px
    }

    .card::after,
    .card::before {
        @apply pointer-events-auto
    }
</style>
