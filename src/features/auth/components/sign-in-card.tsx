import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

import { SignInFlow } from "../types";

interface SignInCardProps {
  state: string;
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ state, setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      flow: "signIn",
    };
    setPending(true);
    signIn("password", formData)
      .catch(() => setError("Invalid email or password"))
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="space--1">
        <CardTitle className="text-2xl">Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <form onSubmit={onPasswordSignIn} className="flex flex-col py-2.5">
        <CardContent className="grid gap-4">
          {!!error && (
            <div className="flex items-center p-3 mb-6 text-sm rounded-md bg-destructive/15 gap-x-2 text-destructive">
              <TriangleAlert className="size-4" />
              <p>{error}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-6">
            <Button
              variant="outline"
              disabled={pending}
              onClick={() => onProviderSignIn("github")}
              size="lg"
            >
              <FaGithub className="w-4 h-4 mr-2" />
              Github
            </Button>
            <Button
              variant="outline"
              disabled={pending}
              onClick={() => onProviderSignIn("google")}
              size="lg"
            >
              <FcGoogle className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="py-1">
              Email
            </Label>
            <Input
              name="email"
              value={email}
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="py-1">
              Password
            </Label>
            <Input
              name="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="gap-2">
            <Button
              type="submit"
              className="w-full gap-2"
              size="lg"
              disabled={pending}
            >
              {state === "signIn" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </CardContent>
      </form>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="cursor-pointer text-sky-700 hover:underline"
          >
            Sign up
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInCard;
