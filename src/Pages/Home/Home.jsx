import { useQuery } from "@tanstack/react-query";
import Banner from "../../Components/Banner";
import Card from "../../Components/Home/Card";
import Container from "../../Components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

import { motion } from "framer-motion";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const Home = () => {

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: async () => {
      const res = await axios.get(
        "https://backend-zeta-eight-65.vercel.app/allscholarships?sortBy=fees_asc&limit=6"
      );
      return res.data.scholarships;
    },
  });


  return (
    <>
      {/* Banner Animation */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.50 }}
      >
        <Banner />
      </motion.div>

      <Container>
        {scholarships.length > 0 && (
          <>
            {/* Section Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="text-2xl text-blue-800 text-center py-10 border-b-4 font-bold mb-6"
            >
              Top Scholarships (Lowest Application Fees)
            </motion.h2>

            {/* Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 py-16 md:grid-cols-3 gap-4 mb-10"
            >
              {scholarships.map((scholarship) => (
                <motion.div
                  key={scholarship._id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card scholarship={scholarship} />
                </motion.div>
              ))}
            </motion.div>



          </>
        )}
      </Container>
                  {/* SUCCESS STORIES  */}
<motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mb-16 "
>
  <h2 className="text-2xl text-blue-800 border-b-3 font-bold mb-6 py-9 text-center">
    Success Stories
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        name: "Sanjida Sattar",
        country: "Canada",
        message:
          "Thanks to ScholarStream, I secured a fully funded scholarship in Canada. The process was simple and transparent.",
      },
      {
        name: "Salman Salem",
        country: "Australia",
        message:
          "The platform helped me find scholarships with low application fees. Highly recommended!",
      },
      {
        name: "Fariha Habib",
        country: "Germany",
        message:
          "ScholarStream made scholarship applications easy and stress-free. Amazing experience!",
      },
    ].map((story, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 }}
        className="p-6 rounded-xl shadow-xl bg-white border border-blue-600"
      >
        <p className="text-gray-500 mb-4">“{story.message}”</p>
        <h4 className="font-semibold text-blue-900">{story.name}</h4>
        <span className="text-sm text-blue-500">
          Scholarship in {story.country}
        </span>
      </motion.div>
    ))}
  </div>
</motion.section>
 {/* FAQ section */}
<motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mb-20"
>
  <h2 className="text-2xl text-blue-800 text-center py-5 border-b-4  font-bold mb-4 ">
    Frequently Asked Questions
  </h2>

  <div className="max-w-3xl mx-auto space-y-4">
    {[
      {
        q: "Is ScholarStream free to use?",
        a: "Yes, browsing scholarships is completely free. Some scholarships may have application fees set by providers.",
      },
      {
        q: "How do I apply for a scholarship?",
        a: "Simply create an account, choose a scholarship, and submit your application online.",
      },
      {
        q: "Can I track my application status?",
        a: "Yes, you can track all your applications from your dashboard.",
      },
    ].map((faq, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 }}
        className="p-5 border border-blue-700 rounded-lg bg-gray-100"
      >
        <h4 className="font-semibold text-blue-800 mb-2">{faq.q}</h4>
        <p className="text-gray-600">{faq.a}</p>
      </motion.div>
    ))}
  </div>
</motion.section>
    </>
  );
};

export default Home;
















// import { useQuery } from "@tanstack/react-query";
// import Banner from "../../Components/Banner"
// import Card from "../../Components/Home/Card";
// import Container from "../../Components/Shared/Container";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import useAxiosSecure from "../../Hooks/useAxiosSequire";


// const Home = () => {
//  const handleSearch = (searchText) => {
//     console.log("Searching for:", searchText);
//   };
//   const axiosSecure = useAxiosSecure()
//    const {data: scholarships=[],isLoading,isError} =useQuery({
//       queryKey: ['scholarships'],
//       queryFn: async () =>{
// const result = await axiosSecure.get(`/scholarships` )
// console.log(result.data.scholarships)
// return result.data.scholarships
//       } 
//     })

//   if(isLoading) return <LoadingSpinner />

//   return (
//     <>
//     <div>
// <Banner onSearch={handleSearch} />
// <Container>
//  {
//       scholarships && scholarships.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4  container mb-9 mt-15 mx-auto">
//           {scholarships.slice(0, 6).map((scholarship) => (
//             <Card key={scholarship._id} scholarship={scholarship} />
//           ))}
//  </div>) : null
//  }
// </Container>

//     </div>
//     </>
//   )
// }

// export default Home