import React from "react";
import Select, { GroupBase, NoticeProps, OptionProps } from "react-select";
import { TeamMember } from "../../@types/team-members";
import MemberCard from "./MemberCard";
import "./custom-select.scss";

const CustomOption:
  | React.ComponentType<OptionProps<TeamMember, false, GroupBase<TeamMember>>>
  | undefined = ({ innerProps, isDisabled, ...rest }) => {
  console.log("rest", rest);
  return !isDisabled ? (
    <div {...innerProps} className="member-card-option">
      <MemberCard
        canDelete={false}
        onDelete={() => {}}
        {...rest.data}
        role={undefined}
      />
      {/* your component internals */}
    </div>
  ) : null;
};

const NoOptionsMessage: React.ComponentType<
  NoticeProps<TeamMember, false, GroupBase<TeamMember>>
> = ({ children, innerProps }) => {
  return (
    <div className="no-options-message">
      <div className="no-options-message__content">
        <p className="no-options-message__title">Team member not found.</p>
        <p className="no-options-message__description">
          Maybe she/he is not yet in your team?
        </p>
      </div>
    </div>
  );
};

type CustomSelectProps = {
  users: TeamMember[];
  setAddUser: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (id: number) => void;
};

const CustomSelect = ({ onAdd, setAddUser, users }: CustomSelectProps) => {
  return (
    <Select
      autoFocus
      onChange={(user) => {
        setAddUser(false);
        user && onAdd(user.id);
      }}
      classNamePrefix="select"
      isClearable
      isSearchable
      components={{
        Option: CustomOption,
        IndicatorSeparator: null,
        DropdownIndicator: null,
        NoOptionsMessage: NoOptionsMessage,
      }}
      options={users}
      getOptionValue={(option) => `${option.username}`}
      placeholder="Type your team member name"
      // menuIsOpen
    />
  );
};

export default CustomSelect;
