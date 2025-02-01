import axios from "./axiosConfig";

interface ScoreResponse {
  id: string;
  team_id: string;
  design: number;
  implementation: number;
  presentation: number;
  innovation: number;
  teamwork: number;
  comment: string;
  round: number;
}

interface CreateScoreRequest {
  team_id: string;
  design: number;
  implementation: number;
  presentation: number;
  innovation: number;
  teamwork: number;
  comment: string;
  round: number;
}

export const fetchScores = async (teamId: string) => {
    try {
      const response = await axios.get<{
        status: string;
        message: string;
        data: {
          message: string;
          scores: ScoreResponse[];
        };
      }>(`panel/getscore/${teamId}`, {
        withCredentials: true,
      });
  
      // The scores are nested inside response.data.data.scores
      if (!response.data.data?.scores) {
        throw new Error('No scores data received');
      }
      
      return response.data.data.scores;
    } catch (err) {
      console.error('Error fetching scores:', err);
      throw err;
    }
};

export const createScore = async ({
  team_id,
  design,
  implementation,
  presentation,
  innovation,
  teamwork,
  comment,
  round,
}: CreateScoreRequest) => {
  try {
    const response = await axios.post(
      `panel/createscore`,
      {
        design,
        implementation,
        presentation,
        innovation,
        teamwork,
        comment,
        team_id,
        round,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteScore = async (scoreId: string) => {
  try {
    const response = await axios.delete(`panel/deletescore/${scoreId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateScore = async ({
  scoreId,
   design,
    implementation,
   presentation,
    innovation,
   teamwork,
   comment,
   round
}: {
    scoreId:string,
    design:number,
    implementation:number,
   presentation:number,
    innovation:number,
   teamwork:number,
   comment:string,
     round:number,
}) => {
  try {
    const response = await axios.put(`panel/updatescore/${scoreId}`,
      {
          design,
          implementation,
            presentation,
            innovation,
           teamwork,
           comment,
           round
      },
        {
            withCredentials: true
        });
     return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};