<script setup lang="ts">
import { ref } from "vue";
import MobileNavHeader from "../../components/spark-ui/resizable-navbar/mobile-nav-header.vue";
import MobileNavMenu from "../../components/spark-ui/resizable-navbar/mobile-nav-menu.vue";
import MobileNavToggle from "../../components/spark-ui/resizable-navbar/mobile-nav-toggle.vue";
import MobileNav from "../../components/spark-ui/resizable-navbar/mobile-nav.vue";
import NavBody from "../../components/spark-ui/resizable-navbar/nav-body.vue";
import NavItems from "../../components/spark-ui/resizable-navbar/nav-items.vue";
import NavbarButton from "../../components/spark-ui/resizable-navbar/navbar-button.vue";
import NavbarLogo from "../../components/spark-ui/resizable-navbar/navbar-logo.vue";
import Navbar from "../../components/spark-ui/resizable-navbar/navbar.vue";

const scroller = ref<HTMLElement | null>(null);
const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
function closeMenu() {
  isMenuOpen.value = false;
}

const navItems = [
  { name: "Features", link: "#" },
  { name: "Pricing", link: "#" },
];
const boxes = [
  { id: 1, title: "The", width: "md:col-span-1" },
  { id: 2, title: "First", width: "md:col-span-2" },
  { id: 3, title: "Rule", width: "md:col-span-1" },
  { id: 4, title: "Of", width: "md:col-span-3" },
  { id: 5, title: "F", width: "md:col-span-1" },
  { id: 6, title: "Club", width: "md:col-span-2" },
  { id: 7, title: "Is", width: "md:col-span-2" },
  { id: 8, title: "You", width: "md:col-span-1" },
  { id: 9, title: "Do NOT TALK about", width: "md:col-span-2" },
  { id: 10, title: "F Club", width: "md:col-span-1" },
];
</script>

<template>
  <div ref="scroller" class="relative h-[452px] max-h-full w-full overflow-y-auto">
    <Navbar :container="scroller" style="top: 0.5rem">
      <template #default="{ visible }">
        <NavBody :visible="visible">
          <NavbarLogo />
          <NavItems :items="navItems" @item-click="closeMenu" />
          <NavbarButton href="#" variant="primary">Sign up</NavbarButton>
        </NavBody>

        <MobileNav :visible="visible">
          <MobileNavHeader class="px-4">
            <NavbarLogo />
            <MobileNavToggle :is-open="isMenuOpen" @click="toggleMenu" />
          </MobileNavHeader>

          <MobileNavMenu :is-open="isMenuOpen" @close="closeMenu">
            <a
              v-for="(item, idx) in navItems"
              :key="`mobile-link-${idx}`"
              :href="item.link"
              class="w-full rounded-md px-4 py-2 text-neutral-600 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              @click="closeMenu"
            >
              {{ item.name }}
            </a>

            <NavbarButton href="#" variant="dark" class="mt-4 w-full" @click="closeMenu">
              Sign up
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </template>
    </Navbar>
    <div class="px-6 pb-6 pt-10">
      <h3 class="mb-2 text-center text-xl font-bold">Scroll inside this area</h3>
      <p class="mb-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        The navbar shrinks once you scroll past 100px.
      </p>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div
          v-for="box in boxes"
          :key="box.id"
          class="flex h-32 items-center justify-center rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-neutral-900"
          :class="box.width"
        >
          <h4 class="text-lg font-medium">
            {{ box.title }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>
