<script setup lang="ts">
import { ref } from "vue";
import MobileNavHeader from "./mobile-nav-header.vue";
import MobileNavMenu from "./mobile-nav-menu.vue";
import MobileNavToggle from "./mobile-nav-toggle.vue";
import MobileNav from "./mobile-nav.vue";
import NavBody from "./nav-body.vue";
import NavItems from "./nav-items.vue";
import NavbarButton from "./navbar-button.vue";
import NavbarLogo from "./navbar-logo.vue";
import Navbar from "./navbar.vue";

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
function closeMenu() {
  isMenuOpen.value = false;
}

const navItems = [
  { name: "Home", link: "/" },
  { name: "Features", link: "/features" },
  { name: "Pricing", link: "/pricing" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];
const boxes = [
  {
    id: 1,
    title: "The",
    width: "md:col-span-1",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 2,
    title: "First",
    width: "md:col-span-2",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 3,
    title: "Rule",
    width: "md:col-span-1",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 4,
    title: "Of",
    width: "md:col-span-3",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 5,
    title: "F",
    width: "md:col-span-1",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 6,
    title: "Club",
    width: "md:col-span-2",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 7,
    title: "Is",
    width: "md:col-span-2",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 8,
    title: "You",
    width: "md:col-span-1",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 9,
    title: "Do NOT TALK about",
    width: "md:col-span-2",
    height: "h-60",
    bg: "bg-gray-100",
  },
  {
    id: 10,
    title: "F Club",
    width: "md:col-span-1",
    height: "h-60",
    bg: "bg-gray-100",
  },
];
</script>

<template>
  <div class="grid place-items-center min-h-screen w-full">
    <Navbar>
      <template #default="{ visible }">
        <NavBody :visible="visible">
          <NavbarLogo />
          <NavItems :items="navItems" @item-click="closeMenu" />
          <NavbarButton to="/signup" variant="primary"> Get Started </NavbarButton>
        </NavBody>

        <MobileNav :visible="visible">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle :is-open="isMenuOpen" @click="toggleMenu" />
          </MobileNavHeader>

          <MobileNavMenu :is-open="isMenuOpen" @close="closeMenu">
            <a
              v-for="(item, idx) in navItems"
              :key="`mobile-link-${idx}`"
              :href="item.link"
              class="w-full px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md"
              @click="closeMenu"
            >
              {{ item.name }}
            </a>

            <NavbarButton to="/signup" variant="dark" class="w-full mt-4" @click="closeMenu">
              Get Started
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </template>
    </Navbar>
    <div class="container mx-auto px-8 pt-24">
      <h1 class="mb-4 text-center text-3xl font-bold">
        Check the navbar at the top of the container
      </h1>
      <p class="mb-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
        For demo purpose we have kept the position as
        <span class="font-medium">Sticky</span>. Keep in mind that this component is
        <span class="font-medium">fixed</span> and will not move when scrolling.
      </p>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div
          v-for="box in boxes"
          :key="box.id"
          class="flex items-center justify-center rounded-lg p-4 shadow-sm"
          :class="[box.width, box.height, box.bg]"
        >
          <h2 class="text-xl font-medium">
            {{ box.title }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
