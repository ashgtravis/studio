import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="password">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="otp">OTP</TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <CardHeader>
              <CardTitle>Login with Password</CardTitle>
              <CardDescription>
                Enter your phone and password to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  required
                  type="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" required type="password" />
              </div>
              <p className="text-xs text-center text-muted-foreground pt-4">
                Since authentication is not implemented, use the buttons below to simulate login.
              </p>
              <div className="flex gap-2">
                <Button asChild className="w-full">
                  <Link href="/?role=client">Login as Client</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/?role=maid">Login as Maid</Link>
                </Button>
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="otp">
            <CardHeader>
              <CardTitle>Login with OTP</CardTitle>
              <CardDescription>
                We&apos;ll send a one-time password to your phone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp-phone">Phone Number</Label>
                <Input
                  id="otp-phone"
                  placeholder="+91 98765 43210"
                  required
                  type="tel"
                />
              </div>
              <Button className="w-full" disabled>Send OTP</Button>
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link className="underline" href="/auth/signup">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
