import { v4 as uuidv4 } from 'uuid';

export function getNewTaskId(): string {
  // TODO: We don't have a backend yet so we'll just use a UUID for now.
  return uuidv4();
}

export function postNewArrow(arrow: Arrow): Promise<Arrow> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(arrow);
    }, 1000);
  });
}