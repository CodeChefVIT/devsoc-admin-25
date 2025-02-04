import { type Leaderboard } from "@/api/leaderboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { type Row } from "@tanstack/react-table";
import {
  Brush,
  Code,
  LayoutList,
  Presentation,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";

export default function ViewScores({ row }: { row: Row<Leaderboard> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Trophy className="h-5 w-5" /> View Scores
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" /> Here are the scores:
          </DialogTitle>
          <DialogDescription>
            <div className="mb-4 rounded-lg border border-gray-300 p-4">
              <Label className="text-lg font-semibold">Team Name:</Label>{" "}
              {row.original.team_name}
            </div>
            <div className="max-h-[65vh] overflow-auto">
              {row.original.rounds.map((round, index) => {
                const {
                  design,
                  implementation,
                  innovation,
                  presentation,
                  teamwork,
                  round_total,
                } = round;
                return (
                  <div
                    key={index}
                    className="mb-4 rounded-lg border border-gray-400 p-4"
                  >
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <LayoutList className="h-5 w-5 text-blue-500" /> Round{" "}
                      {index + 1} Scores:
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Brush className="h-4 w-4 text-purple-500" />
                        <Label className="font-semibold">
                          UI & Design : {design}
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-green-500" />
                        <Label className="font-semibold">
                          Technical Implementation : {implementation}
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <Label className="font-semibold">
                          Innovation & Creativity: {innovation}
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Presentation className="h-4 w-4 text-red-500" />
                        <Label className="font-semibold">
                        Presentation & Communication: {presentation}
                        </Label>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-700" />
                        <Label className="font-semibold">
                          Teamwork: {teamwork}
                        </Label>
                      </div>
                      <div className="mt-2 flex items-center gap-2 border-t pt-2">
                        <Trophy className="h-5 w-5 text-orange-500" />
                        <Label className="text-lg font-semibold">
                          Total Score: {round_total}
                        </Label>
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
