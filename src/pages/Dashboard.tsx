import Header from "../components/Header";
import UsersTable from "../modules/Dashboard/components/UsersTable";

function Dashboard() {
  return (
    <div className="flex">
      <Header />
      <UsersTable />
    </div>
  );
}

export default Dashboard;
