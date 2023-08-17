"use client"
import { Button } from "./ui/Button"
import Link from "next/link"
function BrowseCommunity (){
  return<Button >
    <Link href={`/r`}>
        Browse Community
  </Link>
 </Button>
}

export default BrowseCommunity;