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
  posZ: number;
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
  from: Task;
  to: Task;
  color: string;
}

interface User {
  name: string;
  email: string;
  profilePicUrl: string;
}
