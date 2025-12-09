import Banner from "../../Components/Banner"
import Card from "../../Components/Home/Card";
import Container from "../../Components/Shared/Container";
import TopCard from "../../Components/Shared/TopCard"


const Home = () => {

   const handleSearch = (searchText) => {
    console.log("Searching for:", searchText);

  };

  return (
    <>
    <div>
<Banner onSearch={handleSearch} />
<Container>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4  container mb-9">
  <Card />
 </div>
</Container>
{/* 
 
{/* {data.map(reviews=> <Topcard key={reviews._id} reviews={reviews} /> )} 
*/}
{/* <TopCard />
    </div> */} 
    </div>
    </>
  )
}

export default Home