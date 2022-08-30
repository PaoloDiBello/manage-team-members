import { useEffect, useState } from "react";
import { GetTeamMembersResponse } from "../../@types/team-members";

export const getTeamMembers = async (
  url: string
): Promise<GetTeamMembersResponse> => {
  const data = await fetch(url);
  const dataJson = await data.json();
  return dataJson;
};

export const useTeamMembers = (url: string) => {
  const [teamMembers, setTeamMembers] = useState<GetTeamMembersResponse>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getTeamMembers(url)
      .then((data) => {
        if (Array.isArray(data)) {
          setTeamMembers(data);
        }
      })
      .finally(() => setIsLoading(false));
  }, [url]);
  return { teamMembers, setTeamMembers, isLoading };
};
