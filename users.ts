export interface User {
  id: string;
  username: string;
  password: string;
}

const users: Array<User> = [
  {
    id: "1",
    username: "facu",
    password: "facu",
  },
  {
    id: "2",
    username: "uriona",
    password: "uriona",
  },
];

export default users;
