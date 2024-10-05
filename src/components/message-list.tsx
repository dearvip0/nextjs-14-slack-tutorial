import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Id } from "../../convex/_generated/dataModel";
import { GetMessagesReturnType } from "@/features/messages/api/use-get-messages";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useState } from "react";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { ChannelHero } from "./channel-hero";
import { ConversationHero } from "./conversation-hero";
import { Loader } from "lucide-react";
import { Message } from "./message";

const TIME_THRESHOLD = 5;

interface MessageListProps {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreationTime?: number;
  variant?: "channel" | "thread" | "conversation";
  data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMMM d");
}

export const MessageList = ({
  memberName,
  memberImage,
  channelName,
  channelCreationTime,
  data,
  variant = "channel",
  loadMore,
  isLoadingMore,
  canLoadMore,
}: MessageListProps) => {
  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });

  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );

  return (
    <div className="flex flex-col-reverse flex-1 pb-4 overflow-y-auto messages-scrollbar">
              {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="relative my-2 text-center">
            <hr className="absolute left-0 right-0 border-t border-gray-300 top-1/2" />
            <span className="relative inline-block px-4 py-1 text-xs bg-white border border-gray-300 rounded-full shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const isCompact =
              prevMessage &&
              prevMessage.user?._id === message.user?._id &&
              differenceInMinutes(
                new Date(message._creationTime),
                new Date(prevMessage._creationTime)
              ) < TIME_THRESHOLD;

            return (
              <Message
                key={message._id}
                id={message._id}
                memberId={message.memberId}
                authorImage={message.user.image}
                authorName={message.user.name}
                isAuthor={message.memberId === currentMember?._id}
                reactions={message.reactions}
                body={message.body}
                image={message.image}
                updatedAt={message.updatedAt}
                createdAt={message._creationTime}
                isEditing={editingId === message._id}
                setEditingId={setEditingId}
                isCompact={isCompact}
                hideThreadButton={variant === "thread"}
                threadCount={message.threadCount}
                threadImage={message.threadImage}
                threadName={message.threadName}
                threadTimestamp={message.threadTimestamp}
              />
            )
          })}
        </div>
      ))}
      <div className="h-1">
      {isLoadingMore && (
        <div className="relative my-2 text-center">
          <hr className="absolute left-0 right-0 border-t border-gray-300 top-1/2" />
          <span className="relative inline-block px-4 py-1 text-xs bg-white border border-gray-300 rounded-full shadow-sm">
            <Loader className="size-4 animate-spin" />
          </span>
        </div>
      )}
        {variant === "channel" && channelName && channelCreationTime && (
          <ChannelHero name={channelName} creationTime={channelCreationTime} />
        )}
        {variant === "conversation" && (
          <ConversationHero name={memberName} image={memberImage} />
        )}
      </div>
    </div>
  );
};
