<!-- eslint-disable ts/ban-ts-comment -->
<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide, ref } from "vue";
import MobileNavHeader from "../../src/example/resizable-navbar/mobile-nav-header.vue";
import MobileNavMenu from "../../src/example/resizable-navbar/mobile-nav-menu.vue";
import MobileNavToggle from "../../src/example/resizable-navbar/mobile-nav-toggle.vue";
import MobileNav from "../../src/example/resizable-navbar/mobile-nav.vue";
import NavBody from "../../src/example/resizable-navbar/nav-body.vue";
import NavItems from "../../src/example/resizable-navbar/nav-items.vue";
import NavbarButton from "../../src/example/resizable-navbar/navbar-button.vue";
import NavbarLogo from "../../src/example/resizable-navbar/navbar-logo.vue";
import Navbar from "../../src/example/resizable-navbar/navbar.vue";
import ScrollProgress from "../../src/example/scroll-progress/scroll-progress.vue";

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
function closeMenu() {
  isMenuOpen.value = false;
}

const navItems = [
  { name: "Home", link: "/" },
  { name: "Components", link: "/content/components/animated-beam.html" },
  { name: "Showcase", link: "/" },
  { name: "Github", link: "https://github.com/selemondev" },
  { name: "Twitter", link: "https://twitter.com/selemondev" },
];
const { isDark } = useData();

function enableTransitions() {
  return (
    "startViewTransition" in document &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    },
  );
});
</script>

<template>
  <ScrollProgress />
  <Navbar v-if="useData()?.page?.value?.title === 'Resizable Navbar'">
    <template #default="{ visible }">
      <NavBody :visible="visible">
        <NavbarLogo />
        <NavItems :items="navItems" @item-click="closeMenu" />
        <NavbarButton to="/" variant="primary"> Get Started </NavbarButton>
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
            class="w-full px-4 py-2 text-neutral-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
            @click="closeMenu"
          >
            {{ item.name }}
          </a>

          <NavbarButton
            to="/"
            variant="dark"
            class="w-full dark:text-black mt-4"
            @click="closeMenu"
          >
            Get Started
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </template>
  </Navbar>
  <DefaultTheme.Layout />
</template>
