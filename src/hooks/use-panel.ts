import { useProfileMemberId } from "@/features/members/store/use-profile-member-id";

export const usePanel = () => {
  const [profileMemberId, setProfileMemberId] = useProfileMemberId();

  const onOpenProfile = (memberId: string) => {
    setProfileMemberId(memberId);
  };

  const onClose = () => {
    setProfileMemberId(null);
  };
  return {
    profileMemberId,
    onOpenProfile,
    onClose,
  };
};
