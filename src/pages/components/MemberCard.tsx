import React from "react";
import { Roles, TeamMember } from "../../@types/team-members";
import "./member-card.scss";

type MemberCardProps = TeamMember & {
  onDelete: (id: number) => void;
  canDelete: boolean;
};

const MemberCard = ({
  id,
  picture,
  role,
  username,
  canDelete,
  onDelete,
}: MemberCardProps) => {
  const isExternalMember = role === Roles.External;
  return (
    <div className="member-card">
      <img
        className={`member-card__avatar ${canDelete ? "can-delete" : ""}`}
        src={"docs/assets/" + picture}
        loading="lazy"
        alt={username}
      />
      {canDelete && (
        <button
          className="member-card__avatar delete"
          title="Remove user"
          onClick={() => {
            onDelete(id);
          }}
        >
          <span>x</span>
        </button>
      )}
      <div className="member-card__info">
        <div className="member-card__role">
          {role}
          {isExternalMember && <span className="red-asterisk">*</span>}
        </div>
        <div className="member-card__username">{username}</div>
      </div>
    </div>
  );
};

export default MemberCard;
