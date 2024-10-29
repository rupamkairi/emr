import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { lables } from "@/constants/contents";
import { People } from "@repo/typescript-config";

type Props = {
  people: People[];
};

export default function PeopleTable({ people }: Props) {
  console.log(people);
  return (
    <div>
      <Table>
        <TableCaption className="mb-2">
          {people?.length ? lables.people : "No People"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Qualification</TableHead>
            <TableHead>specialization</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people?.map((p) => (
            <TableRow key={p._id}>
              <TableCell>
                <div>{p.name}</div>
                <div className="text-xs">{p.email}</div>
              </TableCell>
              <TableCell>{p.profile?.qualification}</TableCell>
              <TableCell>{p.profile?.specialization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
