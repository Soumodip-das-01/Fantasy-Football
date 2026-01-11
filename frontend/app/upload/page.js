"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

const UploadAvatar = () => {
  const {data: session, status, update} = useSession()
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);


  if (!session){
    return<Card className="dark mx-auto max-w-lg px-5 justify-center ">
            <CardHeader>
              <CardTitle>Please Login to your account</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Sign in to upload your Avatar</CardDescription>
            </CardContent>
          </Card>
    
  }

  const handleUpload = async ()=>{
    if (!image) return alert("please select an image")
    const formData = new FormData()
    formData.append("avatar", image)

    try{
      setLoading(true)
      const res = await fetch("http://localhost:5000/auth/upload-avatar",{
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const data = await res.json();
      await update({
        user:{
          ...session.user,
          image: data.avatarUrl,
        },
      })
      console.log("Uploaded avatar:", data.avatarUrl)
      alert("Avatar uploaded Successfully")
    }catch(err){
      console.error(err)
      alert("upload failed")
    }finally{
      setLoading(false)
    }

  }
  return (
    <div className='text-white flex items-center justify-center  my-5'>
      <Card className="dark mx-auto max-w-lg px-5 justify-center ">
        <CardHeader className="w-full">
          <CardTitle className="w-full ">
            Upload Your Avatar
          </CardTitle>
        </CardHeader>
        <CardDescription className="w-full px-5">Upload From your device or from other sources </CardDescription>
        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="Avatar">Avatar</Label>
          <Input type="file" id="Avatar" accept="image/*" onChange={handleImageChange}></Input>
          <Label htmlFor="preview">Preview</Label>
          <Item variant='outline'>
            <ItemContent>
              {preview ? (
                <img
                src={preview}
                className='rounded-full w-full h-full'
                />
              ):(
                <ItemFooter>No image selected</ItemFooter>
              )}
            </ItemContent>
          </Item>

          <Button variant='outline' onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload Avatar"}
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}

export default UploadAvatar