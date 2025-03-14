import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Construction } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full p-4 overflow-hidden">
      {/* Red blur background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-600/30 blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-red-500/20 blur-[80px]"></div>
        <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-rose-600/20 blur-[80px]"></div>
      </div>

      <Card className="w-full max-w-md shadow-xl backdrop-blur-sm bg-white/90 dark:bg-black/40 border-white/10">
        <CardHeader className="text-center">
          <Construction className="w-12 h-12 mx-auto mb-2 text-amber-500" />
          <CardTitle className="text-2xl">We are Still in Development!</CardTitle>
          <CardDescription>Sorry for the inconvenience</CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We are working hard to bring you an amazing experience. Please check back soon!
          </p>

          <div className="flex justify-center pt-2">
            <Button asChild variant="default" className="px-3 h-5">
              <Link href="/home">Return to Home</Link>
            </Button>
          </div>
        </CardContent>

        
      </Card>
    </div>
  )
}

