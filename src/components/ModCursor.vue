<template>
    <div class="flex items-center" @mouseover="store.setModCursor(true)" @mouseleave="store.setModCursor(false)">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {useGlobalStore} from '../store';
const store = useGlobalStore();
</script>