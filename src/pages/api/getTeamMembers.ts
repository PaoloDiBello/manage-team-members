import { useEffect, useState } from "react";
import { GetTeamMembersResponse } from "../../@types/team-members";

export const getTeamMembers = async (): Promise<GetTeamMembersResponse> => {
  const data = await fetch(`./data.json`);
  const dataJson = await data.json();
  return dataJson;
};

export const getTeamMembersToAdd =
  async (): Promise<GetTeamMembersResponse> => {
    const data = await fetch(`./data-add.json`);
    const dataJson = await data.json();
    return dataJson;
  };

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<GetTeamMembersResponse>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getTeamMembers()
      .then((data) => {
        if (Array.isArray(data)) {
          setTeamMembers(data);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);
  return { teamMembers, setTeamMembers, isLoading };
};

export const useTeamMembersToAdd = () => {
  const [teamMembers, setTeamMembers] = useState<GetTeamMembersResponse>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTeamMembersToAdd()
      .then((data) => {
        if (Array.isArray(data)) {
          setTeamMembers(data);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { teamMembers, setTeamMembers, isLoading };
};
