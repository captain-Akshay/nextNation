import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import RProvider from '@/components/ui/RProvider';

export const metadata: Metadata = {
  title: 'URVerse',
  description: 'A Community/Prompt built with Next.js and TypeScript for Tech community Only ! ',
};

const Layout = async ({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!subreddit) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      subreddit: {
        name: slug,
      },
    },
  });

  return (<RProvider subreddit={subreddit} memberCount={memberCount} slug={slug} session={session} isSubscribed={isSubscribed}>{children}</RProvider>);
};

export default Layout;
