<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <!-- Both methods gives result -->
        <!-- <input :type="type" :placeholder="placeholder" :value="value" @input="updateValue" v-on="listeners" /> -->
        <!-- $attrs handles all of the attributes passed by the parent component 
            -- here type, placeholder and other attributes(if any) are handled by $attrs
        -->
        <input :value="value" @input="updateValue" v-bind="$attrs" v-on="listeners" />
    </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin'

export default {
    mixins: [formFieldMixin],
    props: {
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
    }
}
</script>
