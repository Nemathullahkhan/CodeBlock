import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex justify-center  max-w-5xl">
      <div className="flex justify-center">
        <Card className="min-h-[200px] w-full p-4">
          <CardTitle>We are still in development!</CardTitle>
          <CardDescription>Sorry for inconvenience</CardDescription>
          <CardContent>Get back to home page 
            <Link href = "/home" className="text-xl text-emerald-500"> Home
            </Link>
          </CardContent>
          <CardFooter>Get</CardFooter>
        </Card>
      </div>
    </div>
  );
}
