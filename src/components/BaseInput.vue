<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <input :type="type" :placeholder="placeholder" :value="value" @input="updateValue" />
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        value: [String, Number],
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value)
        }
    }
}
</script>
