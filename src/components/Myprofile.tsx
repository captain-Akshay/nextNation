"use client"
import { Button } from "./ui/Button"
import Link from "next/link"
function Myprofile ({id}:{id:string | null | undefined}){
  return<Button >
    <Link href={`/u/${id}`}>
  My Profile
  </Link>
 </Button>
}

export default Myprofile