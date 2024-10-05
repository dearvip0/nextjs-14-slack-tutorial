"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const [isClient, setIsClient] = useState(false);

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    setIsClient(true);

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, router, isLoading, setOpen, open, setIsClient]);

  return (
    <div className="flex items-center justify-center h-full">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
