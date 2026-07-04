import { defineConfig } from "vitepress";
import {
	groupIconMdPlugin,
	groupIconVitePlugin,
} from "vitepress-plugin-group-icons";
import { version } from "../../package.json";
import { agentDiscoveryPlugin } from "./plugins/agentDiscovery";
import { applyPlugins } from "./plugins/code";
import { markdownForAgentsPlugin } from "./plugins/markdownForAgents";

const newComponents = [
	{ text: "Animated Tooltip", link: "/content/components/animated-tooltip.md" },
	{ text: "Terminal", link: "/content/components/terminal.md" },
	{ text: "Hero Video Dialog", link: "/content/components/hero-video-dialog.md" },
	{ text: "Scroll Progress", link: "/content/components/scroll-progress.md" },
	{ text: "Aurora Text", link: "/content/components/aurora.md" },
	{ text: "Resizable Navbar", link: "/content/components/resizable-navbar.md" },
	{ text: "Android", link: "/content/components/android.md" },
	{ text: "Animated Circular Progress Bar", link: "/content/components/animated-circular-progress-bar.md" },
	{ text: "Animated Grid Pattern", link: "/content/components/animated-grid-pattern.md" },
	{ text: "Animated Theme Toggler", link: "/content/components/animated-theme-toggler.md" },
	{ text: "Backlight", link: "/content/components/backlight.md" },
	{ text: "Border Beam", link: "/content/components/border-beam.md" },
	{ text: "Code Comparison", link: "/content/components/code-comparison.md" },
	{ text: "Comic Text", link: "/content/components/comic-text.md" },
	{ text: "Confetti", link: "/content/components/confetti.md" },
	{ text: "Cool Mode", link: "/content/components/cool-mode.md" },
	{ text: "Dia Text Reveal", link: "/content/components/dia-text-reveal.md" },
	{ text: "Dock", link: "/content/components/dock.md" },
	{ text: "Dotted Map", link: "/content/components/dotted-map.md" },
	{ text: "File Tree", link: "/content/components/file-tree.md" },
	{ text: "Flickering Grid", link: "/content/components/flickering-grid.md" },
	{ text: "Glare Hover", link: "/content/components/glare-hover.md" },
	{ text: "Glyph Matrix", link: "/content/components/glyph-matrix.md" },
	{ text: "Grid Pattern", link: "/content/components/grid-pattern.md" },
	{ text: "Hexagon Pattern", link: "/content/components/hexagon-pattern.md" },
	{ text: "Highlighter", link: "/content/components/highlighter.md" },
	{ text: "Hyper Text", link: "/content/components/hyper-text.md" },
	{ text: "Icon Cloud", link: "/content/components/icon-cloud.md" },
	{ text: "Interactive Grid Pattern", link: "/content/components/interactive-grid-pattern.md" },
	{ text: "Interactive Hover Button", link: "/content/components/interactive-hover-button.md" },
	{ text: "iPhone", link: "/content/components/iphone.md" },
	{ text: "Kinetic Text", link: "/content/components/kinetic-text.md" },
	{ text: "Lens", link: "/content/components/lens.md" },
	{ text: "Light Rays", link: "/content/components/light-rays.md" },
];

const components = [
  { text: "Animated Beam", link: "/content/components/animated-beam.md" },
  {
    text: "Animated Circular Progress Bar",
    link: "/content/components/animated-circular-progress-bar.md",
  },
  { text: "Animated Gradient Text", link: "/content/components/animated-gradient-text.md" },
  { text: "Animated List", link: "/content/components/animated-list.md" },
  { text: "Animated Shiny Text", link: "/content/components/animated-shiny-text.md" },
  { text: "Avatar Circle", link: "/content/components/avatar-circles.md" },
  { text: "Bento Grid", link: "/content/components/bento-grid.md" },
  { text: "Blur Fade", link: "/content/components/blur-fade.md" },
  { text: "Blur In", link: "/content/components/blur-in.md" },
  { text: "Dot Pattern", link: "/content/components/dot-pattern.md" },
  { text: "Globe", link: "/content/components/globe.md" },
  { text: "Gradual Spacing", link: "/content/components/gradual-spacing.md" },
  { text: "Letter Up", link: "/content/components/letter-up.md" },
  { text: "Marquee", link: "/content/components/marquee.md" },
  { text: "Meteors", link: "/content/components/meteors.md" },
  { text: "Orbiting Circles", link: "/content/components/orbiting-circles.md" },
  { text: "Particles", link: "/content/components/particles.md" },
  { text: "Retro Grid", link: "/content/components/retro-grid.md" },
  { text: "Ripple", link: "/content/components/ripple.md" },
  { text: "Skewed Infinite Scroll", link: "/content/components/skewed-infinite-scroll.md" },
  { text: "Typing Animation", link: "/content/components/typing-animation.md" },
	{ text: "Animated Beam", link: "/content/components/animated-beam.md" },
	{
		text: "Animated Gradient Text",
		link: "/content/components/animated-gradient-text.md",
	},
	{ text: "Animated List", link: "/content/components/animated-list.md" },
	{
		text: "Animated Shiny Text",
		link: "/content/components/animated-shiny-text.md",
	},
	{ text: "Avatar Circle", link: "/content/components/avatar-circles.md" },
	{ text: "Bento Grid", link: "/content/components/bento-grid.md" },
	{ text: "Blur Fade", link: "/content/components/blur-fade.md" },
	{ text: "Blur In", link: "/content/components/blur-in.md" },
	{ text: "Dot Pattern", link: "/content/components/dot-pattern.md" },
	{ text: "Globe", link: "/content/components/globe.md" },
	{ text: "Gradual Spacing", link: "/content/components/gradual-spacing.md" },
	{ text: "Letter Up", link: "/content/components/letter-up.md" },
	{ text: "Marquee", link: "/content/components/marquee.md" },
	{ text: "Meteors", link: "/content/components/meteors.md" },
	{ text: "Orbiting Circles", link: "/content/components/orbiting-circles.md" },
	{ text: "Particles", link: "/content/components/particles.md" },
	{ text: "Retro Grid", link: "/content/components/retro-grid.md" },
	{ text: "Ripple", link: "/content/components/ripple.md" },
	{ text: "Lens", link: "/content/components/lens.md" },
	{
		text: "Skewed Infinite Scroll",
		link: "/content/components/skewed-infinite-scroll.md",
	},
	{ text: "Typing Animation", link: "/content/components/typing-animation.md" },
];

export default defineConfig({
	vite: {
		plugins: [
			groupIconVitePlugin(),
			agentDiscoveryPlugin(),
			markdownForAgentsPlugin(),
			// VitePress bundles Vite 5; plugin instances are compatible at runtime.
		] as never,
	},
	title: "Spark UI",
	description:
		"Experience The Magic Of Animated Components. Crafted With Vue, TypeScript, TailwindCss And Vueuse Motion ✨",
	head: [
		[
			"link",
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/icon.png",
			},
		],
		["meta", { property: "og:type", content: "website" }],
		[
			"link",
			{
				href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
				rel: "stylesheet",
			},
		],
		["script", { src: "/_vercel/insights/script.js", defer: "true" }],
	],
	lastUpdated: true,
	themeConfig: {
		search: {
			provider: "local",
		},
		editLink: {
			pattern: "https://github.com/selemondev/spark-ui/edit/main/docs/:path",
		},
		logo: "../icon.png",
		nav: [
			{
				text: "Guide",
				items: [
					{
						text: "Introduction",
						link: "/content/guide/getting-started/index.md",
					},
					{
						text: "Installation",
						link: "/content/guide/getting-started/installation.md",
					},
				],
			},
			{ text: "Components", items: components },
			{ text: "Showcase", link: "" },
			{ text: `v${version}`, link: "" },
		],

		sidebar: {
			"/content/": [
				{
					text: "✨&nbsp;&nbsp; Getting Started",
					collapsed: true,
					items: [
						{
							text: "Introduction",
							link: "/content/guide/getting-started/index.md",
						},
						{
							text: "Installation",
							link: "/content/guide/getting-started/installation.md",
						},
					],
				},

				{
					text: "📦&nbsp;&nbsp; New Components",
					collapsed: false,
					items: newComponents,
				},

				{
					text: "📦&nbsp;&nbsp; Components",
					collapsed: false,
					items: components,
				},
			],
		},

		socialLinks: [
			{ icon: "github", link: "https://github.com/selemondev/spark-ui" },
			{ icon: "twitter", link: "https://twitter.com/selemondev" },
			{ icon: "discord", link: "https://discord.com/invite/87p2vpsat5" },
		],
		footer: {
			message: "Released under the MIT License.",
			copyright: `Copyright © ${new Date().getFullYear()}-PRESENT Selemon Brahanu.`,
		},
	},
	markdown: {
		config: (md) => {
			applyPlugins(md);
			// @ts-expect-error group-icons markdown-it plugin types differ from VitePress's markdown-it
			md.use(groupIconMdPlugin);
		},
		theme: {
			light: "vitesse-light",
			dark: "vitesse-dark",
		},
	},
});
