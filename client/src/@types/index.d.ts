interface Board {
  id: number;
  owner: User;
  tasks: Task[];
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
  priority?: string;
  deadline?: string;
  assignees?: User[];
  arrowsOut?: Arrow[];
  arrowsIn?: Arrow[];
  timeNeeded?: string;
}
interface Arrow {
  id: number;
  from: number;
  to: number;
  color: string;
}
interface User {
  name: string;
  email: string;
  profilePicUrl: string;
}
