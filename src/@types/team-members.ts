export enum Roles {
  Admin = "Admin",
  Internal = "Internal",
  External = "External",
}

export type GetTeamMembersResponse = TeamMember[];

export type TeamMember = {
  username: string;
  role?: Roles;
  picture: string;
  id: number;
};
