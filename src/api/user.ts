import { type UserResponse } from "@/data/schema";
import { usersResponseSchema } from "@/data/schema";
import axios from "./axiosConfig";

export const fetchUsers = async ({
  limit,
  cursorId,
  name,
  gender,
}: {
  limit: number;
  cursorId?: string;
  name?: string;
  gender?: string
}) => {
  try {
    const params = new URLSearchParams({ limit: String(limit) });

    if (name) {
      params.append("name", name);
    } else if (cursorId) {
      params.append("cursor", cursorId);
    }
    if(gender)
    {
      params.append("gender", gender);
    }
    const url = gender?  `admin/users?${params.toString()}` : `admin/users?${params.toString()}`;

    const response = await axios.get<UserResponse>(url);

    const parsedResponse = usersResponseSchema.parse(response.data);
    const users = parsedResponse.data.users;
    console.log(users);
    const nextCursor = users != null ? users[users.length - 1]?.ID : null;

    return {
      users,
      nextCursor,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};


