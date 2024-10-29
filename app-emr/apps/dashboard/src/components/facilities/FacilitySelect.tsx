import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Facility } from "@repo/typescript-config";

type Props = {
  facilities: Facility[];
  onSelect: (value: Facility["_id"]) => void;
};

export default function FacilitySelect({ facilities, onSelect }: Props) {
  return (
    <Select
      onValueChange={(value) => {
        onSelect(value);
      }}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {facilities?.map((f) => (
          <SelectItem key={f?._id} value={f?._id}>
            {f?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
