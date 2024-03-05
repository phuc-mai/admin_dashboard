import { connectToDB } from "@/lib/mongoDB";
import Customer from "@/lib/models/Customer";
import CustomerDashboard from "@/components/customers/CustomerDashboard";

const Customers = async () => {
  await connectToDB();

  const customers = await Customer.find().sort({ createdAt: "desc" });

  return (
    <div className="px-10 py-5">
      <CustomerDashboard data={customers} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Customers;
