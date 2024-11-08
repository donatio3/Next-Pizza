import { authOptions } from '@/constants/auth-options';
import { getServerSession } from 'next-auth';

export const getUserSession = async () => { // возвращает сессию и пользователя, и return usera 
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
