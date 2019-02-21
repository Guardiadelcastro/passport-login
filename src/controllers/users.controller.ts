import User from '../models/User';

export async function checkRegisterErrors(name: string, email: string, password: string, password2: string) {

  const errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  const user = await findUser(email);
  if(user) {
    errors.push(user);
  }

  return errors

}

export function findUser(email) {
  return User.findOne({email});
}

