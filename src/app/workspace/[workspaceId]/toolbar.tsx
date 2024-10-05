"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Search } from "lucide-react";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { data } = useGetWorkspace({ id: workspaceId });
  const [open, setOpen] = useState(false);

  const onChannelClick = (channelId: string) => {
    setOpen(false);

    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
  };

  const onMemberClick = (memberId: string) => {
    setOpen(false);

    router.push(`/workspace/${workspaceId}/member/${memberId}`);
  };

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className="justify-start w-full px-2 bg-accent/25 hover:bg-accent-25 h-7"
        >
          <Search className="mr-2 text-white size-4" />
          <span className="text-xs text-white">Search {data?.name}</span>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Channels">
              channel
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Members">
              member
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <div className="flex items-center justify-end flex-1 ml-auto">
        <Button variant="transparent" size="iconSm">
          <Info className="text-white size-5" />
        </Button>
      </div>
    </nav>
  );
};
