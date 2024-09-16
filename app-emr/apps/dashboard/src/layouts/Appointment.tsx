import { Outlet, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AppointmentLayout() {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="appointment" className="w-[400px]">
      <TabsList>
        <TabsTrigger
          value="appointment"
          onClick={() => {
            navigate("");
          }}
        >
          Appointment
        </TabsTrigger>
        <TabsTrigger
          value="prescriptions"
          onClick={() => {
            navigate("prescriptions");
          }}
        >
          Prescriptions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="appointment">
        <Outlet />
      </TabsContent>
      <TabsContent value="prescriptions">
        <Outlet />
      </TabsContent>
    </Tabs>
  );
}
