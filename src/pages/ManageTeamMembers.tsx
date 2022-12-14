import React, { useState } from "react";
import { useTeamMembers } from "./api/getTeamMembers";
import AddMemberCard from "./components/AddMemberCard";
import MemberCard from "./components/MemberCard";
import "./manage-team-members.scss";
import { ReactComponent as UsersIcon } from "../icons/users.svg";
import { ReactComponent as ChevronUpIcon } from "../icons/chevron-up.svg";
import { ReactComponent as ChevronDownIcon } from "../icons/chevron-down.svg";

const LIMIT_MEMBERS_SHOWN = 5;

const ManageTeamMembers = () => {
  const { teamMembers: members, setTeamMembers: setMembers } =
    useTeamMembers(`./data.json`);
  const { teamMembers: membersToAdd, setTeamMembers: setTeamMembersToAdd } =
    useTeamMembers(`./data-add.json`);

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((s) => !s);
  };

  const handleDeleteMember = (id: number) => {
    const removedMember = members.find((member) => member.id === id);
    const newMembersTemp = removedMember
      ? [...membersToAdd, removedMember]
      : membersToAdd;
    setMembers(members.filter((member) => member.id !== id));
    setTeamMembersToAdd(newMembersTemp);
    console.log(id);
  };

  const handleAddMember = (id: number) => {
    console.log(id);
    const newMember = membersToAdd.find((member) => member.id === id);
    const membersTemp = newMember ? [...members, newMember] : members;
    setMembers(membersTemp);
    setTeamMembersToAdd(membersToAdd.filter((member) => member.id !== id));
  };

  const hasMembersToAdd = membersToAdd.length > 0;

  const membersToShow = showAll
    ? members
    : members.slice(0, LIMIT_MEMBERS_SHOWN + (hasMembersToAdd ? 0 : 1));

  return (
    <div className="manage-team-members">
      <div className="manage-team-members__container">
        <div className="manage-team-members__header">
          <h1 className="manage-team-members__header__title">
            YOUR TEAM FOR THIS TEST
          </h1>
          <p className="manage-team-members__header__subtitle">
            <span className="manage-team-members__header__subtitle__text">
              TEAM PAGE
            </span>
            <span className="users-icon">
              <UsersIcon />
            </span>
          </p>
        </div>
        <div className="team-members">
          {hasMembersToAdd && (
            <AddMemberCard users={membersToAdd} onAdd={handleAddMember} />
          )}
          {membersToShow?.map((member) => (
            <MemberCard
              key={member.id}
              onDelete={handleDeleteMember}
              canDelete={members.length > 1}
              {...member}
            />
          ))}
        </div>
      </div>
      <div className="manage-team-members__footer">
        {members.length > LIMIT_MEMBERS_SHOWN && (
          <button
            onClick={toggleShowAll}
            className="manage-team-members__footer__cta"
          >
            {showAll ? (
              <>
                SHOW LESS <ChevronUpIcon />
              </>
            ) : (
              <>
                SHOW ALL <ChevronDownIcon />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageTeamMembers;
