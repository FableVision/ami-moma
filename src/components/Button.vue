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
    font-family: 'MoMA Sans-Bold';
    padding: 10px;
    background-size: cover;
    background-color: rgb(0, 0, 0, 0);
    border: none;

    &:disabled {
        opacity: 30%;
    }
}

.start {
    background-image: url(/public/images/btn_frame_01.png);
    width: 200px;
    height: 150px;
    font-size: x-large;
}

.ok {
    background-image: url(/public/images/btn_ok.png);
    width: 300px;
    padding: 50px 0 20px 0;
    font-size: xx-large;
}

.navigate {
    background-image: url(/public/images/btn_frame_02.png);
    padding: 35px 0;
    width: 300px;
    font-size: large;
}

.card-1 {
    background-image: url(/public/images/btn_card_01.png);
    font-size: xxx-large;
    padding: 30px;
    width: 100px;
}

.card-2 {
    background-image: url(/public/images/btn_card_02.png);
    font-size: xxx-large;
    padding: 30px;
    width: 100px;
}

.card-3 {
    background-image: url(/public/images/btn_card_03.png);
    font-size: xxx-large;
    padding: 30px;
    width: 100px;
}
</style>
