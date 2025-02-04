import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RegisterTabs({ onSuccess }: { onSuccess: () => void }) {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="password">Registration</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader className="hidden">
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login to your account here. Click save when re done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSuccess={onSuccess} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader className="hidden">
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm onSuccess={onSuccess} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
