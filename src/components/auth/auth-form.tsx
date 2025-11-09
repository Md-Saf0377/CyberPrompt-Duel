'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn, UserPlus, Shield } from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === 'login';
  const schema = isLogin ? loginSchema : signupSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: isLogin ? { email: "", password: "" } : { username: "", email: "", password: "" },
  });

  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    // Mock API call for demonstration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    toast({
      title: isLogin ? 'Login Successful' : 'Account Created',
      description: isLogin ? 'Welcome back! Redirecting to the game...' : 'Your account has been created. Welcome to the duel!',
    });

    router.push('/game');
  };
  
  const title = isLogin ? 'Welcome Back, Duelist' : 'Join the Duel';
  const description = isLogin ? 'Enter your credentials to access your account.' : 'Create an account to start your journey.';
  const submitButtonText = isLogin ? 'Login' : 'Sign Up';
  const footerLink = isLogin ? '/signup' : '/login';
  const footerText = isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login";
  
  return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10"></div>
          
          <div className="w-full max-w-md">
              <header className="flex justify-center mb-8">
                  <Link href="/" className="flex items-center gap-3" prefetch={false}>
                      <Shield className="h-10 w-10 text-primary" />
                      <span className="font-headline text-2xl font-bold tracking-wider text-glow">
                          CyberPrompt Duel
                      </span>
                  </Link>
              </header>
              <Card className="bg-card/50 border-2 border-primary/20 backdrop-blur-sm shadow-2xl shadow-primary/10 animate-fade-in-up">
                  <CardHeader className="text-center space-y-2">
                      <CardTitle className="font-headline text-3xl font-bold text-glow">{title}</CardTitle>
                      <CardDescription className="text-foreground/70 pt-1">{description}</CardDescription>
                  </CardHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            {!isLogin && (
                              <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-primary/80">Username</FormLabel>
                                    <FormControl>
                                      <Input autoComplete="username" placeholder="VoidWalker" {...field} className="bg-input border-primary/30 focus:border-primary focus:ring-primary"/>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-primary/80">Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" autoComplete="email" placeholder="agent@protocol.io" {...field} className="bg-input border-primary/30 focus:border-primary focus:ring-primary"/>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-primary/80">Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" autoComplete={isLogin ? "current-password" : "new-password"} placeholder="••••••••" {...field} className="bg-input border-primary/30 focus:border-primary focus:ring-primary"/>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pt-6">
                            <Button type="submit" className="w-full font-bold border-2 border-accent bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                  <>
                                    {isLogin ? <LogIn /> : <UserPlus />}
                                    {submitButtonText}
                                  </>
                                )}
                            </Button>
                            <Button variant="link" asChild className="text-foreground/70 hover:text-primary">
                                <Link href={footerLink}>{footerText}</Link>
                            </Button>
                        </CardFooter>
                    </form>
                  </Form>
              </Card>
          </div>
      </div>
  );
}
