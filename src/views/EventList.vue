<template>
    <div>
        <h1>Event Listing</h1>
        <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import axios from 'axios'

export default {
    name: 'EventList',
    components: {
        EventCard
    },
    data() {
        return {
            events: []
        }
    },
    created() {
        axios
            .get('https://raw.githubusercontent.com/bipinstha7/vue-design-pattern/master/db.json')
            .then(response => {
                this.events = response.data.events
            })
            .catch(err => console.log('err', err))
    }
}
</script>
