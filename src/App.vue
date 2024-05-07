<script setup lang="ts">
import ReedeCard from './components/ReedeCard.vue';
import Cursor from './components/Cursor.vue';
import ModCursor from './components/ModCursor.vue';
import MagneticField from './components/MagneticField.vue';
</script>

<template>
  <ModCursor>
    <MagneticField>
      <ReedeCard>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum at consequatur porro molestias dicta quas, corporis sint minus repellat sit? Accusantium harum architecto tempora id sint? Quae neque porro fuga!
      </ReedeCard>
    </MagneticField>
  </ModCursor>
  <Cursor />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
