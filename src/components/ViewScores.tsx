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
                <div>
                  <Label className="font-semibold">Design:</Label>{" "}
                  {row.original.design}
                </div>
                <div>
                  <Label className="font-semibold">Implementation:</Label>{" "}
                  {row.original.implementation}
                </div>
                <div>
                  <Label className="font-semibold">Innovation:</Label>{" "}
                  {row.original.innovation}
                </div>
                <div>
                  <Label className="font-semibold">Presentation:</Label>{" "}
                  {row.original.presentation}
                </div>
                <div>
                  <Label className="font-semibold">Teamwork:</Label>{" "}
                  {row.original.teamwork}
                </div>
                <div>
                  <Label className="font-semibold">Total Score:</Label>{" "}
                  {row.original.total_score}
                </div>
              </CardContent>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
