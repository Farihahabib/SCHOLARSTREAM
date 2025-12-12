import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRows from "../../../Components/Dashboard/Tablerows/CustomerOrderDataRows";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyApplications = () => {
  const { user } = useAuth();

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/my-applications/${user?.email}`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
             <table className="min-w-full leading-normal table-fixed">

                <thead>
                  <tr>
                    <th className="px-5 w-40 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                       University Name
                    </th>

                    <th className="px-5 w-40 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal ">
                 University Address
                    </th>
                    <th className="px-5 w-40 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal ">
                 Subject Category
                    </th>

                    <th className="px-5 w-32 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Application Fees
                    </th>

                    <th className="px-5 w-28 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Status
                    </th>

                    <th className="px-5 py-3 w-28 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <CustomerOrderDataRows
                      key={application._id}
                      application={application}
                    />
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyApplications;

