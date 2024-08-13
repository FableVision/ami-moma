<script setup>
defineProps({
    click: Function,
})
</script>

<template>
    <button @click="click" class="button">
        <slot />
    </button>
</template>

<style scoped>
</style>
