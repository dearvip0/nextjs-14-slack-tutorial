"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "../../../../convex/_generated/dataModel";
import { InviteModal } from "./invite-modal";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { PreferencesModal } from "./preferences-modal";
import { Hint } from "@/components/hint";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({
  workspace,
  isAdmin,
}: WorkspaceHeaderProps) => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  return (
    <>
      <InviteModal
        open={inviteOpen}
        setOpen={setInviteOpen}
        name={workspace?.name}
        joinCode={workspace?.joinCode}
      />
      <PreferencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialValue={workspace?.name || "no Name"}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            >
              <span className="truncate">{workspace?.name}</span>
              <ChevronDown className="ml-1 size-4 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="capitalize cursor-pointer">
              <div className="relative overflow-hidden bg-[#616061] size-9 text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">{`${workspace?.name.charAt(0).toUpperCase()}`}</div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace?.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2 cursor-pointer">
                  Invite people to 😶‍🌫️<th>{workspace?.name}</th>😶‍🌫️
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-2 cursor-pointer"
                  onClick={() => setPreferencesOpen(true)}
                >
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="Filter conversations" side="bottom">
            <Button variant="transparent" size="iconSm">
              <ListFilter className="size-4" />
            </Button>
          </Hint>
          <Hint label="New message" side="bottom">
            <Button variant="transparent" size="iconSm">
              <SquarePen className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};
