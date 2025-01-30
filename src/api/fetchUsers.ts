import { type UserResponse } from "@/data/schema";
import { usersResponseSchema } from "@/data/schema";
import axios from "./axiosConfig";

export const fetchUsers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const response = await axios.get<UserResponse>(
      `admin/users?page=${page}&limit=${limit}`
    );

    const parsedResponse = usersResponseSchema.parse(response.data);
    return {users: parsedResponse.data.users, totalPages: 100};
  } catch (err) {
    console.log(err);
    throw err;
  }
};