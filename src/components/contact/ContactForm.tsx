'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    company: z.string().optional(),
    project: z.string().min(10, {
        message: 'Please provide some details about your project.',
    }),
});

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            project: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // Here you would normally send the form data to your backend
        console.log(values);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        setIsSubmitting(false);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="project"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Details</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us about your technical requirements or project ideas"
                                    className="h-32"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Include any specific technical requirements or challenges you&#39;d like to discuss.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
            </form>
        </Form>
    );
}
