import { banUnban } from "@/api/ban";
import { Button } from "@/components/ui/button";
import { User } from "@/data/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
const BanBtn = ({ row }: { row: Row<User> }) => {
  const queryClient = useQueryClient();
  const handleUnban = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(
        banUnban({
          ban: !row.getValue("IsBanned"),
          email: row.getValue("Email"),
        }),
        {
          loading: "UnRoasting...",
          success: "UnRoast success",
          error: (err: ApiError) => err.message,
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleBan = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(
        banUnban({
          ban: !row.getValue("IsBanned"),
          email: row.getValue("Email"),
        }),
        {
          loading: "Roasting...",
          success: "Roast success",
          error: (err: ApiError) => err.message,
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const onRoastSubmit = (id: string) => {
    handleBan.mutate(id);
  };
  const onunRoastSubmit = (id: string) => {
    handleUnban.mutate(id);
  };
  return (
    <div>
      {row.original.IsBanned ? (
        <div>
          <Button
            variant={row.getValue("IsBanned") ? "destructive" : "outline"}
            onClick={() => {
              onunRoastSubmit(row.original.ID);
            }}
          >
            UnBan
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              onRoastSubmit(row.original.ID);
            }}
            variant={row.getValue("IsBanned") ? "destructive" : "outline"}
          >
            Ban
          </Button>{" "}
        </div>
      )}
    </div>
  );
};
export default BanBtn;
