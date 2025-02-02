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
import { Button } from "./ui/button";

export default function ViewScores({ row }: { row: Row<Leaderboard> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Scores</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Here are the scores: </DialogTitle>
          <DialogDescription>
            <Card>
              <CardContent className="overflow-y-auto space-y-2">
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
                    round_total,
                  } = round;
                  return (
                    <div
                      key={index}
                      className=" border border-black p-2"
                    >
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
                        {round_total}
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
