import type { ComponentType } from 'react';
import {
  Mail,
  MapPin,
  ExternalLink,
  Database,
  Radio,
  Webhook,
  Code2,
  FileCode,
  Layers,
  GitBranch,
  PlugZap,
  Bluetooth,
  Server,
  Cpu,
} from 'lucide-react';
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaJava,
  FaApple,
  FaAndroid,
  FaAppStoreIos,
  FaGooglePlay,
  FaAws,
} from 'react-icons/fa6';
import {
  SiKotlin,
  SiSwift,
  SiJetpackcompose,
  SiFirebase,
  SiNextdotjs,
  SiWordpress,
  SiBootstrap,
  SiHtml5,
  SiSocketdotio,
  SiGit,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiSpring,
  SiDigitalocean,
  SiExpress,
  SiDjango,
  SiLaravel,
  SiGraphql,
  SiDocker,
  SiNginx,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiLinux,
  SiUbuntu,
  SiGithubactions,
  SiCelery,
  SiRabbitmq,
  SiMqtt,
  SiGunicorn,
} from 'react-icons/si';

// Props common to both lucide-react and react-icons icon components.
export type IconProps = {
  size?: number | string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  title?: string;
};

type IconComp = ComponentType<IconProps>;

// String-key registry so data/*.ts can reference icons without importing React.
// Brand marks use Font Awesome 6 / Simple Icons where available; a few that no longer
// ship a brand glyph (Objective-C, CSS) fall back to a tasteful generic icon.
export const icons: Record<string, IconComp> = {
  // socials
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  email: Mail,
  location: MapPin,
  external: ExternalLink,
  // languages & frameworks
  java: FaJava,
  kotlin: SiKotlin,
  compose: SiJetpackcompose,
  objectivec: Code2,
  swift: SiSwift,
  nextjs: SiNextdotjs,
  // databases & realtime
  sql: Database,
  firebase: SiFirebase,
  realtimedb: Database,
  websockets: Radio,
  socketio: SiSocketdotio,
  ocpp: PlugZap, // EV charging protocol — no brand glyph, charging-plug fallback
  // web & frontend
  react: SiReact,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  html: SiHtml5,
  css: FileCode,
  bootstrap: SiBootstrap,
  wordpress: SiWordpress,
  // backend & apis
  nodejs: SiNodedotjs,
  express: SiExpress,
  python: SiPython,
  django: SiDjango,
  php: SiPhp,
  laravel: SiLaravel,
  spring: SiSpring,
  graphql: SiGraphql,
  // databases
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  redis: SiRedis,
  // cloud & devops
  digitalocean: SiDigitalocean,
  aws: FaAws,
  docker: SiDocker,
  nginx: SiNginx,
  linux: SiLinux,
  ubuntu: SiUbuntu,
  githubactions: SiGithubactions,
  gunicorn: SiGunicorn,
  celery: SiCelery,
  rabbitmq: SiRabbitmq,
  vps: Server,
  // hardware & protocols
  bluetooth: Bluetooth,
  mqtt: SiMqtt,
  hardware: Cpu,
  // platforms & tools
  android: FaAndroid,
  apple: FaApple,
  git: SiGit,
  rest: Webhook,
  appstore: FaAppStoreIos,
  playstore: FaGooglePlay,
  mvvm: Layers,
  cicd: GitBranch,
};
