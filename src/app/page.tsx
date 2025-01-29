// src/app/page.tsx
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Technologies } from '@/components/sections/Technologies';
import { Projects } from '@/components/sections/Projects';
import { Process } from '@/components/sections/Process';

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Technologies />
            <Projects />
            <Process />
        </>
    );
}
