<script setup lang="ts">
import AnimatedList from "../../components/spark-ui/animated-list/animated-list.vue";
import Notification from "../../components/spark-ui/animated-list/notification.vue";

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

notifications = Array.from({ length: 10 }, () => notifications).flat();
</script>

<template>
  <div
    class="relative flex size-full max-h-[420px] flex-col items-center justify-center overflow-hidden px-2 sm:px-4"
  >
    <AnimatedList class="h-full w-full max-w-[420px] md:w-full">
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
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white dark:from-black"
    />
  </div>
</template>
