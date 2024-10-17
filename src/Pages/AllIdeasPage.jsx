import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import IdeaCard from "../Components/IdeaCard";
import Bottomnav from "../Components/Bottomnav";
const IdeasAPI = `http://localhost:3000/ideas`;
function AllIdeasPage() {
  const [ideas, setIdeas] = useState([]);
  useEffect(() => {
    getIdeas();
  }, []);

  const getIdeas = () => {
    axios.get(IdeasAPI).then((res) => {
      setIdeas(res.data);
    });
  };
  return (
    <div className="flex h-screen">
      <div>
      <Sidebar name={localStorage.getItem('userName')}></Sidebar>
      </div>
      <div className="p-5 w-full">
        <div className="flex flex-col items-center my-5">
          <div className=" md:self-start md:mx-5">
            <p className="text-xl font-bold">All Approved Ideas</p>
          </div>
          <div className="grid grid-cols-1 p-5 w-full md:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => {
              if (idea.status == "Approved") {
                return (
                  <IdeaCard
                    id={idea._id}
                    title={idea.title}
                    status={idea.status}
                    student={idea.studentName}
                    description={idea.description}
                  ></IdeaCard>
                );
              }
            })}
          </div>
        </div>
      </div>
      <Bottomnav></Bottomnav>
    </div>
  );
}

export default AllIdeasPage;
