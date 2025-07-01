import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ProjectRecord {
  id: number;
  date_quoted: string;
  date_started: string | null;
  date_finished: string | null;
  project_address: string;
  client: string;
  contract_amount: number;
  paid: number;
  user_id_fk: string;
  status: "active" | "quoted" | "finished" | "archived";
  userProfile: {
    name: string;
  };
}

interface SaleRecord {
  sales_id: number;
  date: string;
  project_id_fk: number;
  project: {
    project_address: string;
    contract_amount: number;
    user_profile: {
      name: string;
    };
  };
}

interface SidebarPageLinks {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

interface User {
  name: string;
  email: string;
}

interface UserProfile {
  user_id: string;
  name: string;
  role: string[];
  avatar: string;
}

interface UserProfileContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

interface SidebarPageLinks {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface ColumnDef {
  key: string;
  label: string;
  width?: string;
}

interface ColumnAccessByRoleProps {
  [role: string]: ColumnDef[];
}

interface TableColumnProps {
  project: ProjectRecord;
  idx: number;
  handleValueChange: (
    projectId: number,
    field: keyof ProjectRecord,
    newValue: string
  ) => void;
  openDialog: (project: ProjectRecord) => void;
}

interface TableFooterProps {
  totalContract: string;
  totalPaid: string;
  totalOutstanding: string;
  totalProgress: number;
}

interface UserProfileProviderProps {
  children: ReactNode;
}

export type {
  ProjectRecord,
  SaleRecord,
  SidebarPageLinks,
  LoginFormProps,
  User,
  UserProfile,
  UserProfileContextType,
  ColumnDef,
  ColumnAccessByRoleProps,
  TableColumnProps,
  TableFooterProps,
  UserProfileProviderProps,
};
