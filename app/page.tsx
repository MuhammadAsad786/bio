import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Systems } from '@/components/sections/Systems';
import { Statement } from '@/components/sections/Statement';
import { Apps } from '@/components/sections/Apps';
import { Demo } from '@/components/sections/Demo';
import { Process } from '@/components/sections/Process';
import { WorksWith } from '@/components/sections/WorksWith';
import { Reviews } from '@/components/sections/Reviews';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Systems />
      <Statement />
      <Apps />
      <Demo />
      <Process />
      <WorksWith />
      <Reviews />
      <Faq />
      <Contact />
    </>
  );
}
