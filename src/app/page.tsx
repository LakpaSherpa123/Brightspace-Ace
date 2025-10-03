import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { KeyRound } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  const loginBg = PlaceHolderImages.find((image) => image.id === 'login-bg');

  return (
    <main className="relative min-h-screen w-full">
      {loginBg && (
        <Image
          src={loginBg.imageUrl}
          alt={loginBg.description}
          data-ai-hint={loginBg.imageHint}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <div className="flex items-center gap-4 mb-8">
            <Icons.logo className="h-16 w-16 text-white" />
            <h1 className="font-headline text-6xl font-bold text-white tracking-tighter">
              BrightSpace Ace
            </h1>
        </div>

        <Card className="w-full max-w-sm bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
            <CardDescription className="text-white/80">
              Your intelligent compass for navigating Brightspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm">
              Connect your account to unlock your personalized dashboard, calendar, and AI assistant.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/dashboard">
                <KeyRound className="mr-2 h-4 w-4" />
                Connect with Brightspace
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <p className="mt-8 text-xs text-white/50">
          By connecting your account, you agree to our Terms of Service.
        </p>
      </div>
    </main>
  );
}
