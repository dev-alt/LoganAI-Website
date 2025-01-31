'use client';

import React, { useState, useRef, useEffect, ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { gsap } from '@/lib/gsap';

interface NavItem {
    name: string;
    href: string;
}

interface ButtonProps {
    variant?: 'default' | 'ghost';
    size?: 'default' | 'icon';
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const navigation: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -4 },
    visible: { opacity: 1, y: 0 },
};

function Button({
                    variant = 'default',
                    size = 'default',
                    className = '',
                    onClick,
                    children,
                }: ButtonProps): ReactElement {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

    const variantStyles = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizeStyles = {
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function ThemeToggle(): ReactElement {
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDark(document.documentElement.classList.contains('dark'));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const toggleTheme = (): void => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? 'dark' : 'light'}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
            </AnimatePresence>
        </Button>
    );
}

export function Header(): ReactElement {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate header background on scroll
            gsap.to(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top top',
                    end: '+=50',
                    scrub: true,
                },
                backgroundColor: 'rgba(var(--background), 0.95)',
                ease: 'none',
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <header
            ref={headerRef}
            className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/30" />
            </div>

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="group -m-1.5 p-1.5">
            <span className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Logan
              </span>
              <span className="text-foreground">AI</span>
            </span>
                        <div className="h-px w-0 bg-gradient-to-r from-primary to-transparent transition-all group-hover:w-full" />
                    </Link>
                </div>

                <div className="flex gap-4 lg:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </Button>
                </div>

                <motion.div
                    className="hidden lg:flex lg:gap-x-12"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.05,
                            },
                        },
                    }}
                >
                    {navigation.map((item) => (
                        <motion.div key={item.name} variants={navItemVariants}>
                            <Link
                                href={item.href}
                                className={`relative text-sm font-semibold leading-6 transition-colors hover:text-primary ${
                                    pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                                }`}
                            >
                                {item.name}
                                {pathname === item.href && (
                                    <motion.div
                                        className="absolute -bottom-[21px] left-0 right-0 h-px bg-gradient-to-r from-primary/80 via-primary to-primary/80"
                                        layoutId="navbar-indicator"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-primary to-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:from-primary/90 hover:to-primary"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 20 }}
                        >
                            <div className="flex items-center justify-between">
                                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold">
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Logan
                    </span>
                    <span className="text-foreground">AI</span>
                  </span>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </Button>
                            </div>
                            <motion.div
                                className="mt-6 flow-root"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                        },
                                    },
                                }}
                            >
                                <div className="-my-6 divide-y divide-border">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <motion.div key={item.name} variants={navItemVariants}>
                                                <Link
                                                    href={item.href}
                                                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors hover:bg-accent/50 ${
                                                        pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                                                    }`}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
