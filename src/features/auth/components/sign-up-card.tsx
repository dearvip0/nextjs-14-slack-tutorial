import { useState } from "react";
import { SignInFlow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  state: string;
  setState: (state: SignInFlow) => void;
}
const SignUpCard = ({ state, setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = { name, email, password, flow: "signUp" };

    setPending(true);
    signIn("password", formData)
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="h-[830px] p-8 w-680px">
      <CardHeader className="space--1">
        <CardTitle className="text-2xl">Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <form onSubmit={onPasswordSignUp} className="flex flex-col py-2.5">
        <CardContent className="grid gap-4 px-0 pb-0 space-y-5">
          {!!error && (
            <div className="flex items-center p-3 mb-6 text-sm rounded-md bg-destructive/15 gap-x-2 text-destructive">
              <TriangleAlert className="size-4" />
              <p>{error}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-6 py-1">
            <div className="gap-2">
              <Button
                disabled={pending}
                onClick={() => onProviderSignUp("github")}
                variant="outline"
                size="lg"
                className="relative w-full"
              >
                <FaGithub className="w-4 h-4 mr-2" />
                Github
              </Button>
            </div>
            <div className="gap-2">
              <Button
                disabled={pending}
                onClick={() => onProviderSignUp("google")}
                variant="outline"
                size="lg"
                className="relative w-full"
              >
                <FcGoogle className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>
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
            <Label htmlFor="name" className="py-1">
              Name
            </Label>
            <Input
              disabled={pending}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: John Smith"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="py-1">
              Email
            </Label>
            <Input
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              type="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="py-1">
              Password
            </Label>
            <Input
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="minimum 8 characters"
              type="password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword" className="py-1">
              Confirm Password
            </Label>
            <Input
              disabled={pending}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              type="password"
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {state === "signUp" ? "Sign Up" : "Sign In"}
          </Button>
        </CardContent>
      </form>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="cursor-pointer text-sky-700 hover:underline"
          >
            Sign in
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpCard;
