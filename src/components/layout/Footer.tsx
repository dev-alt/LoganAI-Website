import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

const navigation = {
    main: [
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
    ],
    social: [
        {
            name: 'GitHub',
            href: '#',
            icon: Github,
        },
        {
            name: 'LinkedIn',
            href: '#',
            icon: Linkedin,
        },
        {
            name: 'Email',
            href: 'mailto:contact@loganai.dev',
            icon: Mail,
        },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16">
                <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
                    {navigation.main.map((item) => (
                        <div key={item.name} className="pb-6">
                            <Link
                                href={item.href}
                                className="text-sm leading-6 text-muted-foreground hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </nav>
                <div className="mt-10 flex justify-center space-x-10">
                    {navigation.social.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-muted-foreground hover:text-primary"
                        >
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                    ))}
                </div>
                <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
                    &copy; {new Date().getFullYear()} Logan Software & AI Solutions. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
