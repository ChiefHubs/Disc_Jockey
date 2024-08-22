import React, { createContext, useState } from "react";
import { DJUser } from "../hooks/useUser";
import { Venue } from "../hooks/useVenues";

const initialValue = {
  DJUsers: [],
  handleChangeDJUsers: (val: DJUser[]) => {
    val;
  },
  followBtnClicked: false,
  handleClickFollowBtn: (val: boolean) => {
    val;
  },
};

const DJUsersContext = createContext(initialValue);

const initialValueVenue = {
  VenueUsers: [],
  handleChangeDJUsers: (val: Venue[]) => {
    val;
  },
  followBtnClicked: false,
  handleClickFollowBtn: (val: boolean) => {
    val;
  },
};

const VenueUsersContext = createContext(initialValueVenue);

interface IDJUsersProviderProps {
  children: React.ReactNode;
}

const DJUsersProvider = ({ children }: IDJUsersProviderProps) => {
  const [DJUsers, setDJUsers] = useState<DJUser[]>(initialValue.DJUsers);
  const [followBtnClicked, setFollowBtnClicked] = useState<boolean>(initialValue.followBtnClicked);

  const handleChangeDJUsers = (val: DJUser[]) => {
    setDJUsers(val);
  };

  const handleClickFollowBtn = (val: boolean) => {
    setFollowBtnClicked(val);
  };

  return (
    <DJUsersContext.Provider
      value={{
        // @ts-ignore
        DJUsers,
        handleChangeDJUsers,
        followBtnClicked,
        handleClickFollowBtn,
      }}
    >
      {children}
    </DJUsersContext.Provider>
  );
};

interface IVenueUsersProviderProps {
  children: React.ReactNode;
}

const VenueUsersProvider = ({ children }: IVenueUsersProviderProps) => {
  const [VenueUsers, setVenueUsers] = useState<Venue[]>(initialValueVenue.VenueUsers);
  const [followBtnClicked, setFollowBtnClicked] = useState<boolean>(initialValueVenue.followBtnClicked);

  const handleChangeVenueUsers = (val: Venue[]) => {
    setVenueUsers(val);
  };

  const handleClickFollowBtn = (val: boolean) => {
    setFollowBtnClicked(val);
  };

  return (
    <VenueUsersContext.Provider
      value={{
        // @ts-ignore
        VenueUsers,
        handleChangeVenueUsers,
        followBtnClicked,
        handleClickFollowBtn,
      }}
    >
      {children}
    </VenueUsersContext.Provider>
  );
};

export { DJUsersContext, DJUsersProvider, VenueUsersContext, VenueUsersProvider };
