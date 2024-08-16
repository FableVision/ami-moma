<script setup>
defineProps({
    click: Function,
    variant: String
})
</script>

<template>
    <button @click="click" class="button" :class="variant">
        <slot />
    </button>
</template>

<style scoped>
button {
    font-size: medium;
}
</style>
