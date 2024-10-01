import { lables } from "@/constants/contents";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ky from "ky";
import { apis } from "@/constants/apis";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

async function createDoctor({ data }: any) {
  console.log({ data });
  const body = await ky
    .post(apis.doctors, {
      json: data,
      headers: {
        user_id: localStorage?.getItem("user_id") ?? "",
      },
      credentials: "include",
    })
    .json();
  console.log(body);
  return body;
}

export default function AddDoctor() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      specialization: "",
      qualification: "",

      associated_facility: "",
    },
  });

  const { user } = useUserStore();
  const ownFacility = user?.ownersOf?.[0];

  const { mutate: mutateCreateDoctor } = useMutation({
    mutationKey: ["createDoctor"],
    mutationFn: createDoctor,
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <p>{lables.addDoctor}</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lables.name}</FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lables.email}</FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <br />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="specialization"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lables.specialization}</FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="qualification"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lables.qualification}</FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <br />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="associated_facility"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lables.associatedFacility}</FormLabel>
                      <FormDescription></FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {user?.ownersOf?.map((facility: any, k: number) => (
                            <SelectItem key={k} value={facility?._id}>
                              {facility?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <br />
              <Button
                type="button"
                onClick={() => {
                  const data = form.getValues();
                  mutateCreateDoctor({
                    data,
                  });
                }}
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
