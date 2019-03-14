<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <select :value="value" @input="updateValue" v-bind="$attrs" v-on="$listeners">
            <option v-for="option in options" :value="option" :key="option" :selected="option === value">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            required: true
        },
        value: [String, Number]
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value)
        }
    }
}
</script>
