"use client"
import { Button } from "../ui/Button"
import Link from "next/link"
function PlayGroundButton (){
  return<Button >
    <Link href={`/playground`}>
        Play Ground
  </Link>
 </Button>
}

export default PlayGroundButton;