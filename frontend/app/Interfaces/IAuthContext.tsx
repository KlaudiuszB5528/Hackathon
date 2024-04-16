import { Dispatch, SetStateAction } from 'react';
import { ITeamData } from './ITeamData';
import { ITeamFile } from './ITeamFile';
import { ITeamMember } from './ITeamMember';

export interface IAuthContext {
  setShouldUpdate: Dispatch<SetStateAction<boolean>>;
  teamData: ITeamData | null;
  setTeamData: (teamData: ITeamData | null) => void;
  teamDataLoading: boolean;
  setTeamDataLoading: (loading: boolean) => void;
  teamMembers: ITeamMember[] | null;
  setTeamMembers: (teamMembers: ITeamMember[] | null) => void;
  teamFiles: ITeamFile[] | null;
  setTeamFiles: (teamFiles: ITeamFile[] | null) => void;
}
