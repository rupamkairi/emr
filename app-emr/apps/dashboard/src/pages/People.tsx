import FacilitySelect from "@/components/facilities/FacilitySelect";
import AddDoctor from "@/components/people/AddDoctor";
import AddMedicalStaff from "@/components/people/AddMedicalStaff";
import PeopleTable from "@/components/people/PeopleTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { apis } from "@/constants/apis";
import { lables } from "@/constants/contents";
import { useUserStore } from "@/stores/user";
import type { People } from "@repo/typescript-config";
import { useMutation } from "@tanstack/react-query";
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
  return body as People[];
}

export default function PeoplePage() {
  const people = useMutation({
    mutationKey: ["people", { facility_id: null }],
    mutationFn: getPeople,
  });

  const { user } = useUserStore();
  const ownFacility = user?.ownersOf?.[0];

  const [filters, setFilters] = useState({
    facility_id: ownFacility?._id ?? null,
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
            <FacilitySelect
              facilities={user?.ownersOf ?? []}
              onSelect={(value) => {
                setFilters({ ...filters, facility_id: value });
              }}
            />
          </div>
          <br />
          <div>
            <PeopleTable people={people.data ?? []} />
            {/* {people.data?.map((person: any, k: number) => (
              <div key={k}>
                <p>{person.name}</p>
                <p>{person?.profile?.qualification}</p>
              </div>
            ))} */}
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
