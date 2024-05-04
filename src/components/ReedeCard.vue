<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const maxAngle = 60;
const card = ref<HTMLElement | null>(null);

const handleMouseMove = (event: MouseEvent) => {
    if (card.value) {
        const cardRect = card.value.getBoundingClientRect();

        const cardCenter = {
            x: cardRect.left + cardRect.width / 2,
            y: cardRect.top + cardRect.height / 2
        };

        const mouse = {
            x: event.clientX - cardCenter.x,
            y: event.clientY - cardCenter.y
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
    <div class="container" @mousemove="handleMouseMove" @mouseleave="resetTransform" ref="container">
        <div class="card mod-cursor" ref="card">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
    .card {
        @apply w-72 h-96 m-8 bg-white rounded-xl text-black shadow-inner will-change-transform z-0;
        transition: transform linear 0.1s;
        transform-style: preserve-3d;
        perspective: 1000px
    }
    .container {
        @apply relative flex items-center;
    }
</style>
