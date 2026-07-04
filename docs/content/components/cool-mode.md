# Cool Mode

A wrapper that spawns a burst of colorful particles from buttons, links, and other elements while they are pressed and held.

<demo src="../../src/example/cool-mode/demo.vue" srcCode="../../src/spark-ui-demos/cool-mode/cool-mode.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [cool-mode.vue]
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

export interface CoolParticleOptions {
  particle?: string;
  size?: number;
  particleCount?: number;
  speedHorz?: number;
  speedUp?: number;
}

interface CoolParticle {
  element: HTMLElement | SVGSVGElement;
  left: number;
  size: number;
  top: number;
  direction: number;
  speedHorz: number;
  speedUp: number;
  spinSpeed: number;
  spinVal: number;
}

interface CoolModeProps {
  options?: CoolParticleOptions;
}

const props = defineProps<CoolModeProps>();

const containerRef = ref<HTMLSpanElement | null>(null);

let cleanup: (() => void) | null = null;

const SVG_NS = "http://www.w3.org/2000/svg";

let instanceCounter = 0;

function getContainer(): HTMLElement {
  const id = "_coolMode_effect";
  const existingContainer = document.getElementById(id);

  if (existingContainer) {
    return existingContainer;
  }

  const container = document.createElement("div");
  container.setAttribute("id", id);
  container.setAttribute(
    "style",
    "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647",
  );

  document.body.appendChild(container);

  return container;
}

function applyParticleEffect(element: HTMLElement, options?: CoolParticleOptions): () => void {
  instanceCounter++;

  const defaultParticle = "circle";
  const particleType = options?.particle || defaultParticle;
  const sizes = [15, 20, 25, 35, 45];
  const limit = 45;

  let particles: CoolParticle[] = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;

  const container = getContainer();

  const appendCircleParticle = (particle: HTMLDivElement, size: number) => {
    const circleSVG = document.createElementNS(SVG_NS, "svg");
    const circle = document.createElementNS(SVG_NS, "circle");

    circle.setAttributeNS(null, "cx", (size / 2).toString());
    circle.setAttributeNS(null, "cy", (size / 2).toString());
    circle.setAttributeNS(null, "r", (size / 2).toString());
    circle.setAttributeNS(null, "fill", `hsl(${Math.random() * 360}, 70%, 50%)`);

    circleSVG.appendChild(circle);
    circleSVG.setAttribute("width", size.toString());
    circleSVG.setAttribute("height", size.toString());

    particle.appendChild(circleSVG);
  };

  const appendImageParticle = (particle: HTMLDivElement, imageSrc: string, size: number) => {
    const image = document.createElement("img");
    image.src = imageSrc;
    image.width = size;
    image.height = size;
    image.alt = "";
    image.style.borderRadius = "50%";

    particle.appendChild(image);
  };

  const appendTextParticle = (particle: HTMLDivElement, particleContent: string, size: number) => {
    const fontSizeMultiplier = 3;
    const emojiSize = size * fontSizeMultiplier;
    const content = document.createElement("div");

    content.textContent = particleContent;
    content.style.fontSize = `${emojiSize}px`;
    content.style.lineHeight = "1";
    content.style.textAlign = "center";
    content.style.width = `${size}px`;
    content.style.height = `${size}px`;
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    content.style.transform = `scale(${fontSizeMultiplier})`;
    content.style.transformOrigin = "center";

    particle.appendChild(content);
  };

  function generateParticle() {
    const size = options?.size || sizes[Math.floor(Math.random() * sizes.length)];
    const speedHorz = options?.speedHorz || Math.random() * 10;
    const speedUp = options?.speedUp || Math.random() * 25;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;

    const particle = document.createElement("div");

    if (particleType === "circle") {
      appendCircleParticle(particle, size);
    } else if (particleType.startsWith("http") || particleType.startsWith("/")) {
      appendImageParticle(particle, particleType, size);
    } else {
      appendTextParticle(particle, particleType, size);
    }

    particle.style.position = "absolute";
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`;

    container.appendChild(particle);

    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top,
    });
  }

  function refreshParticles() {
    particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;

      if (p.top >= Math.max(window.innerHeight, document.body.clientHeight) + p.size) {
        particles = particles.filter((o) => o !== p);
        p.element.remove();
      }

      p.element.setAttribute(
        "style",
        [
          "position:absolute",
          "will-change:transform",
          `top:${p.top}px`,
          `left:${p.left}px`,
          `transform:rotate(${p.spinVal}deg)`,
        ].join(";"),
      );
    });
  }

  let animationFrame: number | undefined;

  let lastParticleTimestamp = 0;
  const particleGenerationDelay = 30;

  function loop() {
    const currentTime = performance.now();
    if (
      autoAddParticle &&
      particles.length < limit &&
      currentTime - lastParticleTimestamp > particleGenerationDelay
    ) {
      generateParticle();
      lastParticleTimestamp = currentTime;
    }

    refreshParticles();
    animationFrame = requestAnimationFrame(loop);
  }

  loop();

  const isTouchInteraction = "ontouchstart" in window;

  const tap = isTouchInteraction ? "touchstart" : "mousedown";
  const tapEnd = isTouchInteraction ? "touchend" : "mouseup";
  const move = isTouchInteraction ? "touchmove" : "mousemove";

  const updateMousePosition = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      mouseX = e.touches?.[0].clientX;
      mouseY = e.touches?.[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };

  const tapHandler = (e: MouseEvent | TouchEvent) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };

  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };

  element.addEventListener(move, updateMousePosition as EventListener, { passive: true });
  element.addEventListener(tap, tapHandler as EventListener, { passive: true });
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
  element.addEventListener("mouseleave", disableAutoAddParticle, {
    passive: true,
  });

  return () => {
    element.removeEventListener(move, updateMousePosition as EventListener);
    element.removeEventListener(tap, tapHandler as EventListener);
    element.removeEventListener(tapEnd, disableAutoAddParticle);
    element.removeEventListener("mouseleave", disableAutoAddParticle);

    const interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        clearInterval(interval);

        if (--instanceCounter === 0) {
          container.remove();
        }
      }
    }, 500);
  };
}

onMounted(() => {
  if (containerRef.value) {
    cleanup = applyParticleEffect(containerRef.value, props.options);
  }
});

onUnmounted(() => {
  if (cleanup) {
    cleanup();
    cleanup = null;
  }
});
</script>

<template>
  <span ref="containerRef">
    <slot />
  </span>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import CoolMode from "@/components/spark-ui/cool-mode/cool-mode.vue";
</script>

<template>
  <CoolMode>
    <button>Click me</button>
  </CoolMode>
</template>
```

## Examples

### Custom Particle

Pass an image URL through the `particle` option to spray a custom particle instead of the default circles.

<demo src="../../src/example/cool-mode/custom-demo.vue" srcCode="../../src/spark-ui-demos/cool-mode/custom-cool-mode.vue" />

## Props

| Prop      | Type                  | Default | Description                                   |
| --------- | --------------------- | ------- | --------------------------------------------- |
| `options` | `CoolParticleOptions` | —       | Configuration object for the particle effect. |

### `CoolParticleOptions`

| Field           | Type     | Default    | Description                                                                         |
| --------------- | -------- | ---------- | ----------------------------------------------------------------------------------- |
| `particle`      | `string` | `"circle"` | Particle to render. A URL renders an image; any other string renders as text/emoji. |
| `size`          | `number` | `Varies`   | Size of the particle in pixels.                                                     |
| `particleCount` | `number` | `Varies`   | The number of particles to generate.                                                |
| `speedHorz`     | `number` | `Varies`   | Horizontal speed of the particles.                                                  |
| `speedUp`       | `number` | `Varies`   | Upward speed of the particles.                                                      |

## Slots

| Slot      | Description                                                |
| --------- | ---------------------------------------------------------- |
| `default` | The element (button, link, etc.) that triggers the effect. |

## Credits

- Credit to [Bankk](https://www.x.com/bankkroll_eth)
- Inspired by [ClickFusion](https://github.com/BankkRoll/ClickFusion)
