import { db } from "@/lib/db";
import { Prompt } from "@prisma/client";
export async function GET(req: Request) {
    try {
        // Get the 'tags' query parameter from the request
        const url = new URL(req.url)
        const tagsQuery = url.searchParams.get('tags')
        const tags = tagsQuery ? tagsQuery.split(',') : [];
        let results:Prompt[]=[];
        for (let index = 0; index < tags.length; index++) {
          const element = tags[index];
          const prompts = await db.prompt.findMany({
            where: {
              tags:{
                contains:element
              }
            },
            // Include the related author data
            include: {
              author: true,
            },
          });
          results=[...prompts,...results]
          console.log(prompts);
        }
        return new Response(JSON.stringify(results))
      }catch (error) {
        return new Response(
          'Could not search at this time. Please try later',
          { status: 500 }
        )
      }
}