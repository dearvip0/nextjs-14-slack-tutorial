import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

export const ConversationHero = ({
  name = "Member",
  image,
}: ConversationHeroProps) => {
  const avatarFallback = name.charAt(0).toUpperCase();

  return (
    <div className="mt-[88px] mx-5 mb-4">
      <div className="flex items-center mb-2 gap-x-1">
        <Avatar className="mr-2 size-14">
          <AvatarImage src={image} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
