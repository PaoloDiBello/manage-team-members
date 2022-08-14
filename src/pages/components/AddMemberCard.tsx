import React from "react";
import { TeamMember } from "../../@types/team-members";
import CustomSelect from "./CustomSelect";
import "./member-card.scss";

type AddMemberCardProps = {
  users: TeamMember[];
  onAdd: (id: number) => void;
};

const AddMemberCard = ({ users, onAdd }: AddMemberCardProps) => {
  const [addUser, setAddUser] = React.useState(false);

  if (users.length === 0) {
    return null;
  }
  return (
    <div
      className="add-member-container"
      onBlur={() => {
        setAddUser(false);
      }}
    >
      {addUser ? (
        <CustomSelect users={users} setAddUser={setAddUser} onAdd={onAdd} />
      ) : (
        <div
          className="member-card add"
          onClick={() => {
            setAddUser(true);
          }}
        >
          <div className="member-card__avatar">
            <span>+</span>
          </div>
          <div className="member-card__info">
            <p className="member-card__info__add-member">
              Add team member to this test
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMemberCard;
