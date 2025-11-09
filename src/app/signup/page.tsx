import { AuthForm } from '@/components/auth/auth-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | CyberPrompt Duel',
  description: 'Create an account to join CyberPrompt Duel.',
};

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
