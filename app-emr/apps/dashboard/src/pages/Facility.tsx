// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { apis } from "@/constants/apis";
// import { lables } from "@/constants/contents";
// import { useUserStore } from "@/stores/user";
// import { useMutation } from "@tanstack/react-query";
// import ky from "ky";
// import { useForm } from "react-hook-form";

// async function createSubFacility({ facilityId, data }: any) {
//   console.log({ facilityId, data });
//   const body = await ky
//     .post(apis.facility.subFacilities(facilityId), {
//       json: data,
//       headers: {
//         user_id: localStorage?.getItem("user_id") ?? "",
//       },
//       credentials: "include",
//     })
//     .json();
//   console.log(body);
//   return body;
// }

export default function FacilityPage() {
  // const form = useForm({
  //   defaultValues: {
  //     name: "Metropoliton Neuro",
  //   },
  // });

  // const { user } = useUserStore();
  // const ownFacility = user?.ownersOf?.[0];
  // // console.log(ownFacility);

  // const { mutate: mutateCreateSubFacility } = useMutation({
  //   mutationKey: ["createSubFacility"],
  //   mutationFn: createSubFacility,
  // });

  return (
    <div>
      <p>Facility Page</p>
      {/* <Card>
        <CardHeader>
          <p className="font-bold">Facilities</p>
        </CardHeader>
        <CardContent>
          <ul>{user?.ownersOf?.map((el, k) => <li key={k}>{el?.name}</li>)}</ul>
        </CardContent>
      </Card>
      <br />

      <Card>
        <CardHeader>
          <p className="font-bold">Create sub-facility</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="w-64">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>{lables.name}</FormLabel>
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
                onClick={() => {
                  const data = form.getValues();
                  mutateCreateSubFacility({
                    facilityId: ownFacility?._id,
                    data,
                  });
                }}
              >
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card> */}
    </div>
  );
}
