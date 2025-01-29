'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

const navItemVariants = {
    hidden: { opacity: 0, y: -4 },
    visible: { opacity: 1, y: 0 },
};

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Glass gradient effect */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/30" />
            </div>

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Global">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="group -m-1.5 p-1.5">
            <span className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Logan</span>
              <span className="text-foreground">AI</span>
            </span>
                        <div className="h-px w-0 bg-gradient-to-r from-primary to-transparent transition-all group-hover:w-full" />
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex gap-4 lg:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="inline-flex items-center justify-center rounded-md"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </Button>
                </div>

                {/* Desktop navigation */}
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

                {/* Desktop right section */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
                    <ThemeToggle />
                    <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                        <Link href="/contact">
                            Get Started
                        </Link>
                    </Button>
                </div>
            </nav>

            {/* Mobile menu */}
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
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Logan</span>
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
