<template>
    <div class="notification-bar" :class="notificationTypeClass">
        <p>{{notification.message}}</p>
    </div>
</template>

<script>
export default {
    props: {
        notification: {
            type: Object,
            required: true
        }
},
    computed: {
        notificationTypeClass() {
            return `-text-${this.notification.type}`
        }
    }
}
</script>

<style>
.notification-bar {
    margin: 1em 0 1em;
}
</style>
