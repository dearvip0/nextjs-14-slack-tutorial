"use client";
import React from "react";
import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "../api/use-current-user";
import { Button } from "@/components/ui/button";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!data) return null;
  const { image, name, email } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="relative outline-none">
        <Button variant="ghost" className="relative w-10 h-10 rounded-full">
          <Avatar className="w-10 h-10 transition size-10 hover:opacity-75">
            <AvatarImage alt={name} src={image} className="rounded-md" />
            <AvatarFallback className="text-white rounded-md bg-sky-500">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="h-10">Profile</DropdownMenuItem>
          <DropdownMenuItem className="h-10" onClick={() => signOut()}>
            <LogOut className="mr-2 size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
