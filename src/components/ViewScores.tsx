import { Leaderboard } from "@/api/leaderboard";
import { Row } from "@tanstack/react-table";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "./ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function ViewScores({ row }: { row: Row<Leaderboard> }) {
  return (
    <Dialog>
      <DialogTrigger>View Scores</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Here are the scores: </DialogTitle>
          <DialogDescription>
            <Card>
              <CardContent className="space-y-2">
                <div>
                  <Label className="font-semibold">Team Name:</Label>{" "}
                  {row.original.team_name}
                </div>
                {row.original.rounds.map((round, index) => {
                  const {
                    design,
                    implementation,
                    innovation,
                    presentation,
                    teamwork,
                    total_score,
                  } = round;

                  return (
                    <div key={index} className="border border-black p-2 overflow-y-auto">
                      <div>Round {index} score: </div>
                      <div>
                        <Label className="font-semibold">Design:</Label>{" "}
                        {design}
                      </div>
                      <div>
                        <Label className="font-semibold">Implementation:</Label>{" "}
                        {implementation}
                      </div>
                      <div>
                        <Label className="font-semibold">Innovation:</Label>{" "}
                        {innovation}
                      </div>
                      <div>
                        <Label className="font-semibold">Presentation:</Label>{" "}
                        {presentation}
                      </div>
                      <div>
                        <Label className="font-semibold">Teamwork:</Label>{" "}
                        {teamwork}
                      </div>
                      <div>
                        <Label className="font-semibold">Total Score:</Label>{" "}
                        {total_score}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
