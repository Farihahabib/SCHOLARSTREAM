
import { useQuery } from "@tanstack/react-query";
import Banner from "../../Components/Banner"
import Card from "../../Components/Home/Card";
import Container from "../../Components/Shared/Container";
import TopCard from "../../Components/Shared/TopCard"
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";


const Home = () => {
 const handleSearch = (searchText) => {
    console.log("Searching for:", searchText);
  };
   const {data: scholarships=[],isLoading,isError} =useQuery({
      queryKey: ['scholarships'],
      queryFn: async () =>{
const result = await axios(`${import.meta.env.VITE_API_URL}/scholarships` )
return result.data
      } 
    })

  if(isLoading) return <LoadingSpinner />

  return (
    <>
    <div>
<Banner onSearch={handleSearch} />
<Container>
 {
      scholarships && scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  container mb-9 mt-15 mx-auto">
          {scholarships.slice(0, 6).map((scholarship) => (
            <Card key={scholarship._id} scholarship={scholarship} />
          ))}
 </div>) : null
 }
</Container>

    </div>
    </>
  )
}

export default Home