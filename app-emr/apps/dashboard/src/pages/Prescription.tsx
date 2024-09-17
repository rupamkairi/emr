import PatientsConditions from "@/components/patients/PatientsConditions";
import PatientsDiagnosis from "@/components/patients/PatientsDiagnosis";
import PatientsSymptoms from "@/components/patients/PatientsSymptoms";
import PatientsVitals from "@/components/patients/PatientsVitals";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PrescriptionPage() {
  return (
    <div className="">
      <h2>Prescription Page</h2>
      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <p className="font-bold">Metro General Hospital</p>
            <CardDescription>
              <p>+1234567891</p>
              <p>info@metrohospital.com</p>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <p className="font-bold">Dr. John Doe</p>
            <CardDescription>
              <p>Dermatology</p>
              <p>MD, MBBS, DNB(UK)</p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <br />

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Alice Johnson</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 md:col-span-1">
                <PatientsVitals />
              </div>
              <div className="col-span-2 md:col-span-1">
                <PatientsSymptoms />
              </div>
              <div className="col-span-2">
                <PatientsConditions />
              </div>
              <div className="col-span-2">
                <PatientsDiagnosis />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
