<script setup lang="ts">
import AnimatedList from "./animated-list.vue";
import Notification from "./notification.vue";

let notifications = [
  {
    name: "Payment received",
    description: "Spark UI",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Spark UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Spark UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Spark UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 30 }, () => notifications).flat();
</script>

<template>
  <AnimatedList>
    <template #default>
      <Notification
        v-for="(item, index) in notifications"
        :key="index"
        :name="item.name"
        :description="item.description"
        :icon="item.icon"
        :color="item.color"
        :time="item.time"
      />
    </template>
  </AnimatedList>
</template>
