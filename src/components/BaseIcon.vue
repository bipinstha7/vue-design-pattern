<template>
    <div class="icon-wrapper">
        <svg class="icon" :width="width" :height="height">
            <!-- feather-sprite.svg on public folder -->
            <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }"></use>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'BaseIcon',
    props: {
        name: {
            type: String,
            default: ''
        },
        width: {
            type: [Number, String],
            default: 24
        },
        height: {
            type: [Number, String],
            default: 24
        }
    }
}
</script>

<style scoped>
.icon-wrapper {
    display: inline-flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.4);
    font-size: 1rem;
    font-weight: 600;
}
.icon {
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    margin-right: 6px;
}
</style>
