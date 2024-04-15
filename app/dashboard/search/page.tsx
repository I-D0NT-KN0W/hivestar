"use client"

import { useState } from "react"
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import Post from "@/components/Post"
import axios from "axios";





export default function Feed() {
  const [filter, setFilter] = useState("")
  const [tag, setTag] = useState("")
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [position, setPosition] = React.useState("bottom")

 const apicall = async () => {
  try {
    setPosts([])
    setLoading(true)
    const {data} = await axios.get('../api/postsearch', {params:{filter:filter,tag:tag}})
    setPosts(data);
    console.log(data)
    setLoading(false)
} catch (error) {
    setLoading(true)
}
 }

  return (
    <div className="p-2">
        <div className=" flex justify-evenly">
        <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="tags">Tags</Label>
      <Input type="text" id="tags" placeholder="tags" onChange={(e) => setTag(e.target.value)} />
    </div>
        <DropdownMenu >
      <DropdownMenuTrigger asChild className=" mt-5">
        <Button variant="outline">Filter <ChevronDown className=" ml-1"/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Choose Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="Created" onClick={() => setFilter("created")}>Created</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Trending" onClick={() => setFilter("trending")}>Trending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Hot" onClick={() => setFilter("hot")}>Hot</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    `   </DropdownMenu>
    <Button className="mt-5" onClick={apicall}>Search</Button>
        </div>
      <div className=" mt-4 flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
            {loading && <p>Loading...</p>}
            <Post data={posts} />
        </div>
    </div>
  )
}
