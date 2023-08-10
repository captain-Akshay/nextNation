"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [image,setImage]=useState<{
    fileUrl: string;
    fileKey: string;
}[] | undefined>([]);
  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const combinedTag = post.tag.replace(/#/g, ' ');
    try {
      let imageURL:string="";
      if(image){
        imageURL=image[0].fileUrl
      }
      const response = await fetch("/api/p/create", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: combinedTag,
          image:imageURL
        }),
      });
  
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      setImage={setImage}
    />
    </>
  );
};

export default CreatePrompt;