import { TeamsFromSearch, type Team, type TeamResponse } from "@/data/schema";
import { type MainSearch, MainTeamSearchResponse} from "@/data/schema";

import axios from "./axiosConfig";


export const fetchTeamDetails = async ({ uuid }: { uuid: string }) => {
  try {
    // const response = await axios.get<MainSearch>(
    //   `admin/teams/${uuid}`
    // );
    // // console.log(response)
    // const parsedResponse = MainTeamSearchResponse.parse(response.data)
    // console.log(parsedResponse)
    return {
          "idea": {
              "ID": "880e8400-e29b-41d4-a716-446655440000",
              "Title": "AI Chatbot for Customer Support",
              "Description": "An AI-powered chatbot to enhance customer support experiences.",
              "Track": "AI & ML"
          },
          "score": [
              {
                  "ID": "660e8400-e29b-41d4-a716-446655440000",
                  "TeamID": "550e8400-e29b-41d4-a716-446655440000",
                  "Design": 85,
                  "Implementation": 90,
                  "Presentation": 88,
                  "Round": 1,
                  "Innovation": 0,
                  "Teamwork": 0,
                  "Comment": null
              }
          ],
          "submission": {
              "ID": "770e8400-e29b-41d4-a716-446655440000",
              "Title": "AI-powered Assistant",
              "Description": "An AI-driven virtual assistant for productivity.",
              "Track": "AI & ML",
              "GithubLink": "https://github.com/alpha-innovators/ai-assistant",
              "FigmaLink": "https://figma.com/alpha-ai",
              "OtherLink": "https://alpha-innovators.com",
              "TeamID": "550e8400-e29b-41d4-a716-446655440000"
          },
          "team": {
              "ID": "550e8400-e29b-41d4-a716-446655440000",
              "Name": "Alpha Innovators",
              "NumberOfPeople": 5,
              "RoundQualified": 1,
              "Code": "ALPHA123",
              "IsBanned": false
          },
          "team_members": [
              {
                  "FirstName": "Soham",
                  "LastName": "Maha",
                  "Email": "soham.mahapatra2025@vitstudent.ac.in",
                  "RegNo": "23BCI0074",
                  "PhoneNo": "0987654321"
              },
              {
                  "FirstName": "Soham",
                  "LastName": "Maha",
                  "Email": "soham.mahapatra2026@vitstudent.ac.in",
                  "RegNo": "23BCI0075",
                  "PhoneNo": "0987654322"
              },
              {
                  "FirstName": "Soham",
                  "LastName": "Maha",
                  "Email": "soham.mahapatra2027@vitstudent.ac.in",
                  "RegNo": "23BCI0076",
                  "PhoneNo": "0987654324"
              },
              {
                  "FirstName": "Soham",
                  "LastName": "Maha",
                  "Email": "soham.mahapatra2023@vitstudent.ac.in",
                  "RegNo": "23BCI0077",
                  "PhoneNo": "0987654323"
              },
              {
                  "FirstName": "Maha",
                  "LastName": "Soha",
                  "Email": "soham.mahapatra2024@vitstudent.ac.in",
                  "RegNo": "23BCI0078",
                  "PhoneNo": "0987654325"
              }
          ]
      }
  } catch (err) {
    console.log(err);
    throw err;
  }
};