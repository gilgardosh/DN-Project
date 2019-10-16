import { RequestHandler } from 'express';
import userDataJSON from '../../../src/api/users/users.json';


export const userDataController: RequestHandler = (req, res, next) => {
  // http://localhost:4040/api/v1/users/{{ userId }}

  const { userId } = req.params;
  const userData = JSON.parse(JSON.stringify(userDataJSON));
  res.status(200).json(userData[userId]);
}
