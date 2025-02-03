// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export function RegisterTabs({ onSuccess }: { onSuccess: () => void }) {
  return (
    <Tabs defaultValue="login" className="w-[400px] mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="password">Registration</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <VisuallyHidden>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to your account here. Click save when re done.
              </CardDescription>
            </CardHeader>
          </VisuallyHidden>
          <CardContent className="space-y-2">
            <LoginForm onSuccess={onSuccess} />
          </CardContent>
          {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <VisuallyHidden>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, ll be logged out.
              </CardDescription>
            </CardHeader>
          </VisuallyHidden>
          <CardContent className="space-y-2">
            <RegisterForm onSuccess={onSuccess} />
          </CardContent>
          {/* <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
