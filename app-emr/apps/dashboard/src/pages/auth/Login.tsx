import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { lables } from "@/constants/contents";
import { routes } from "@/constants/routes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ky from "ky";
import { useMutation } from "@tanstack/react-query";

async function submitLogin(data: any) {
  console.log({ data });
  return await ky
    .post("http://localhost:10000/auth/login", {
      json: data,
      credentials: "include",
    })
    .json();
}

export default function LoginPage() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "rupamkairi@gmail.com",
      password: "Rupam@123",
    },
  });

  const login = useMutation({
    mutationKey: ["submitLogin", form],
    mutationFn: submitLogin,
  });

  useEffect(() => {
    if (false) {
      navigate(routes.dashboard.root, { replace: true });
    }
  }, []);

  return (
    <div className="h-screen overflow-auto flex justify-center items-center">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="w-64">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{lables.email}</FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{lables.password}</FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <br />
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    const data = form.getValues();
                    console.log(data);
                    login.mutateAsync(data).then(() => {
                      console.log("logged in maybe");
                    });
                  }}
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {/* <Link to={routes.dashboard.root}>Dashboard</Link> */}
      </div>
    </div>
  );
}
