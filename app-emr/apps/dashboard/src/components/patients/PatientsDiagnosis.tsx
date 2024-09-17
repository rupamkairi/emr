import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RichEditor from "@/components/rich-editor/RichEditor";
import { lables } from "@/constants/contents";
import PatientsMedications from "./PatientsMedications";

export default function PatientsDiagnosis() {
  const form = useForm();

  return (
    <Card>
      <CardHeader>
        <CardDescription>Diagnosis</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid grid-cols-1 gap-1">
            <PatientsMedications />
            <br />
            <FormField
              control={form.control}
              name="diagnosis_notes"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>{lables.diagnosisNotes}</FormLabel>
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
