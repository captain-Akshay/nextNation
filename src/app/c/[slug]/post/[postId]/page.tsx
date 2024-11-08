import CommentsSection from "@/components/CommentsSection";
import EditorOutput from "@/components/EditorOutput";
import PostVoteServer from "@/components/post-vote/PostVoteServer";
import { db } from "@/lib/db";
// import { redis } from '@/lib/redis'
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  PostProvider,
  PostProviderSub,
  PostVoteShell,
} from "@/components/PostProvider";
interface SubRedditPostPageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const SubRedditPostPage = async ({ params }: SubRedditPostPageProps) => {
  const cachedPost = null;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();
  return (
    <div className="rounded-md">
      <PostProvider>
        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-expect-error server component */}
          <PostVoteServer
            postId={post?.id || ""}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              });
            }}
          />
        </Suspense>
        <PostProviderSub post={post} cachedPost={cachedPost}>
          <EditorOutput content={post?.content} />
          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            }
          >
            {/* @ts-expect-error Server Component */}
            <CommentsSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </PostProviderSub>
      </PostProvider>
    </div>
  );
};

export default SubRedditPostPage;
