import AddDoctor from "@/components/people/AddDoctor";
import AddMedicalStaff from "@/components/people/AddMedicalStaff";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apis } from "@/constants/apis";
import { lables } from "@/constants/contents";
import { useUserStore } from "@/stores/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useEffect, useState } from "react";

export async function getPeople({ facility_id }: any) {
  const sp = new URLSearchParams();
  sp.append("facility_id", facility_id);
  const body = await ky
    .get(`${apis.people}?${sp.toString()}`, {
      credentials: "include",
    })
    .json();
  console.log(body);
  return body;
}

export default function PeoplePage() {
  const people = useMutation({
    mutationKey: ["people", { facility_id: null }],
    mutationFn: getPeople,
  });

  const { user } = useUserStore();
  const ownFacility = user?.ownersOf?.[0];
  const [filters, setFilters] = useState({
    facility_id: ownFacility?.id ?? null,
  });

  useEffect(() => {
    people.mutateAsync({ facility_id: filters.facility_id }).then((data) => {
      console.log(data);
    });
  }, [filters]);

  return (
    <div>
      <Card>
        <CardHeader>{lables.people}</CardHeader>
        <CardContent>
          <div>
            <Select
              onValueChange={(value) => {
                setFilters({ ...filters, facility_id: value });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {user?.ownersOf?.map((facility: any, k: number) => (
                  <SelectItem key={k} value={facility?._id}>
                    {facility?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <br />
          <div>
            {people.data?.map((person: any, k: number) => (
              <div key={k}>
                <p>{person.name}</p>
                <p>{person?.profile?.qualification}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <br />

      <AddDoctor />
      <br />

      <AddMedicalStaff />
      <br />
    </div>
  );
}
