"use client";

import { Loader, TriangleAlert } from "lucide-react";

import { useGetChannel } from "@/features/channels/api/use-get-channel";

import { useChannelId } from "@/hooks/use-channel-id";

import { Header } from "./header";
import { ChatInput } from "./chat-input";



const ChannelIdPage = () => {
  const channelId = useChannelId();

  // const { results, status, loadMore } = useGetMessages({ channelId });
  const { data: channel, isLoading: channelLoading } = useGetChannel({ id: channelId });



  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full gap-y-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Channel not found
        </span>
      </div>
    );
  }

  return ( 
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <div>Message List</div>
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
};
 
export default ChannelIdPage;
