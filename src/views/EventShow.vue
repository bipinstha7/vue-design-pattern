<template>
    <h1>Showing event #{{ id }}</h1>
</template>
<script>
export default {
    name: 'EventShow',
    props: {
        id: {
            type: Number,
            default: 0
        }
    }
}
</script>
