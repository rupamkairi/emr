import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { lables } from "@/constants/contents";
import { DatePicker } from "../ui/date-picker";

export default function PatientsMedications() {
  return (
    <div>
      <div>
        <Label>{lables.searchMedicine}</Label>
        <Combobox />
      </div>
      <br />
      <div>
        <Label>{lables.medications}</Label>
        <Table>
          <TableCaption className="mb-2">{lables.medications}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-64">Medicine</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Medicine Name</TableCell>
              <TableCell>
                <FrequencySelect />
              </TableCell>
              <TableCell>
                <DurationRange />
              </TableCell>
              <TableCell>
                <Input className="w-32" type="number" inputMode="numeric" />
              </TableCell>
              <TableCell>
                <Textarea
                  className="w-64 h-10"
                  placeholder="Instructions, Cautions, notes..."
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FrequencySelect() {
  return (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
      </SelectContent>
    </Select>
  );
}

function DurationRange() {
  return <DatePicker triggerClassName="w-64" mode="range" />;
}
