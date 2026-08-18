import { requireCustomerPage } from '@/lib/customerAuth';
import RepairRequestForm from '@/components/account/RepairRequestForm';

export default async function NewRepairRequestPage() {
  await requireCustomerPage();

  return <RepairRequestForm />;
}
