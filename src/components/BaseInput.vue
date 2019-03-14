<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <!-- Both methods gives result -->
        <!-- <input :type="type" :placeholder="placeholder" :value="value" @input="updateValue" v-on="listeners" /> -->
        <input :value="value" @input="updateValue" v-bind="$attrs" v-on="listeners" />
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            default: ''
        },
        value: [String, Number]
        /* We don't need these two if $attrs are used */
        // type: {
        //     type: String,
        //     default: 'text'
        // },
        // placeholder: {
        //     type: String,
        //     default: ''
        // }
    },
    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.updateValue
            }
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value)
        }
    }
}
</script>
