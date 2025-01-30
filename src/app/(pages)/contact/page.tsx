// src/app/(pages)/contact/page.tsx
import { Metadata } from 'next';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch to discuss your technical requirements.',
};

const contactMethods = [
    {
        icon: Mail,
        title: 'Email',
        description: 'Contact for technical inquiries',
        value: 'contact@loganai.dev',
        href: 'mailto:contact@loganai.dev',
    },
    {
        icon: Github,
        title: 'GitHub',
        description: 'View technical projects',
        value: 'github.com/yourusername',
        href: 'https://github.com/yourusername',
    },
    {
        icon: Linkedin,
        title: 'LinkedIn',
        description: 'Professional profile',
        value: 'linkedin.com/in/yourusername',
        href: 'https://linkedin.com/in/yourusername',
    },
    {
        icon: MapPin,
        title: 'Location',
        description: 'Based in',
        value: 'Mount Maunganui, New Zealand',
        href: null,
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            {/* Hero section */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Contact
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Let&#39;s discuss your technical requirements and explore how we can help bring your ideas to life.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Contact form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Discussion</CardTitle>
                                <CardDescription>
                                    Share your technical requirements or project ideas.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact methods and information */}
                    <div className="space-y-8">
                        {contactMethods.map((method) => (
                            <Card key={method.title}>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary">
                                            <method.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{method.title}</CardTitle>
                                            <CardDescription>{method.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {method.href ? (
                                        <a
                                            href={method.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {method.value}
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground">{method.value}</span>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Additional information */}
                <Card className="mt-16">
                    <CardContent className="p-6">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                                Technical Collaboration
                            </h2>
                            <p className="text-muted-foreground">
                                We focus on technical excellence and practical solutions. Our expertise spans AI development,
                                software engineering, and cloud architecture. Let&#39;s discuss how we can help with your specific
                                technical challenges.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
