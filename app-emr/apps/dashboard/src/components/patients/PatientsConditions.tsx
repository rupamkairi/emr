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
import { Textarea } from "../ui/textarea";
import RichEditor from "../rich-editor/RichEditor";

export default function PatientsConditions() {
  const form = useForm();

  return (
    <Card>
      <CardHeader>
        <CardDescription>Conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid grid-cols-1 gap-1">
            <FormField
              control={form.control}
              name="conditions_notes"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>{lables.conditionsNotes}</FormLabel>
                    <FormDescription></FormDescription>
                  </div>
                  <div>
                    <FormControl>
                      <>
                        <RichEditor placeholder="Notes" {...field} />
                      </>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conditions_remarks"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>{lables.conditionsRemarks}</FormLabel>
                    <FormDescription></FormDescription>
                  </div>
                  <div>
                    <FormControl>
                      <>
                        <RichEditor placeholder="Remarks" {...field} />
                      </>
                    </FormControl>
                    <FormMessage></FormMessage>
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
