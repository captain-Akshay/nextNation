import { db } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')

  if (!q) return new Response('Invalid query', { status: 400 })

  const results = await db.user.findMany({
    where: {
        username:{
        startsWith: q,
        }
    },
    take: 5,
  })
  const ans:{
    id:string,
    name:string
  }[]=[];

  results.map((item)=>{
    ans.push({
      id:item.id,
      name:item.username??"unknown"
    });
  });
  return new Response(JSON.stringify(ans))
}
