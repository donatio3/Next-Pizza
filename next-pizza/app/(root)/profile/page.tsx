import { ProfileForm } from '@/components/shared/profile-form';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';

// вытасикваем сессию человека, если авторизован то показываем страницу профиля если нет то
export default async function ProfilePage() {
  const session = await getUserSession(); // проверка на уровне сервера - до загрузки страницы; Возвращает пользователя сессии

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });

  if (!user) {
    return redirect('/not-auth');
  }

  return <ProfileForm data={user} />;
}
