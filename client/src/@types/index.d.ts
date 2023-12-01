interface Board {
  id: number;
  title: string;
  owner?: User;
  arrows: Arrow[];
  tasks: Task[];
  users: User[];
}
interface Task {
  id: number;
  title: string;
  width: number;
  height: number;
  posX: number;
  posY: number;
  // posZ: number;
  color: string;
  description?: string;
  status?: string;
  priority?: number;
  deadline?: Date;
  assignees?: User[];
  arrowsOut?: Arrow[];
  arrowsIn?: Arrow[];
}
interface Arrow {
  id: number;
  from: number;
  to: number;
  color: string;
}
interface User {
  id: number;
  name: string;
  email?: string;
  profilePicUrl?: string;
}
