import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Working({working}:{working?: {explanation:string} | null}){
  if(!working) return null;
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-gray-50">Working</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 leading-7">{working.explanation}</p>
      </CardContent>
    </Card>
  )
}
