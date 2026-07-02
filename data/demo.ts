// Optional "see it in action" demo clip for the home page. Leave as `null` to hide the section.
// To enable: drop a short, muted MP4 at public/videos/demo.mp4 (and a poster image), then set:
//   export const demo: Demo = {
//     src: '/videos/demo.mp4',
//     poster: '/images/demo-poster.jpg',
//     caption: 'Cast to any TV in one tap.',
//   };
export type Demo = { src: string; poster?: string; caption?: string };

export const demo: Demo | null = null;
