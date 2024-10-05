"use client";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useMemberId } from "@/hooks/use-member-id";

import { UserItem } from "./user-item";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useChannelId } from "@/hooks/use-channel-id";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetChannels } from "@/features/channels/api/use-get-channels";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();
  const channelId = useChannelId();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_open, setOpen] = useCreateChannelModal();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members } = useGetMembers({
    workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="text-white size-5 animate-spin" />
      </div>
    );
  }

  if (!workspace || !members) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="text-white size-5" />
        <p className="text-sm text-white">Workspace mot found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member?.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" id="threads" icon={MessageSquareText} />
        <SidebarItem label="Drafts & Sent" icon={SendHorizontal} id="drafts" />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={member?.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        // onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
            variant={item._id === memberId ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
