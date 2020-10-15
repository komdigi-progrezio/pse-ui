<template>
    <div v-if="messages.length">
        <div v-for="(value, index) in messages" :key="index" class="has-error">
            {{ value }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        messages: {
            type: Array || Object,
            required: true,
            default: () => [],
        },
    },
};
</script>

<style scoped>
.has-error {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
}
</style>
