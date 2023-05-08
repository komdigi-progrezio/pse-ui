<template>
  <Notification100 database="/notifikasi/complete" />
  <!-- <NotificationNew database="/notifikasi/new" /> -->
</template>

<script>
import Notification100 from './TheHeaderNotificationList'
// import NotificationNew from './TheHeaderNotificationList'
export default {
  name: 'TheHeaderNotification',
  components: {
    Notification100,
    // NotificationNew,
  },
}
</script>
