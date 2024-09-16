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
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function PatientsSymptoms() {
  const form = useForm();

  return (
    <Card>
      <CardHeader>
        <CardDescription>Symptoms</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid grid-cols-1 gap-1">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                    <div>
                      <FormLabel>{lables.age}</FormLabel>
                      <FormDescription></FormDescription>
                    </div>
                    <div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                    <div>
                      <FormLabel>{lables.weight}</FormLabel>
                      <FormDescription></FormDescription>
                    </div>
                    <div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
