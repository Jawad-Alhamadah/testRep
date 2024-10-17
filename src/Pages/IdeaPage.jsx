import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import IdeaCard from "../Components/IdeaCard";
import Bottomnav from "../Components/Bottomnav";
const IdeasAPI = `http://localhost:3000/ideas`;
const EditAPI = `/student/updateIdea`
function IdeaPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [isApproved, setIsApproved] = useState();
  const [status, setStatus] = useState();
const textareaRef = useRef(null)
  const [circle, setCircle] = useState("");
  const [statusText, setStatusText] = useState("");
  const [editMode, setEditMode] = useState(true);
  const [titleStyle, setTitleStyle] = useState(
    "text-xl w-full my-4 bg-transparent font-semibold"
  );
  const [textStyle, setTextStyle] = useState("text-xl w-full p-4 bg-transparent");

  useEffect(() => {
    getIdea();
  }, []);
    useEffect(() => {
            setIsApproved(idea.status == "Approved");
            setTitle(idea.title);
            setDescription(idea.description);
            setStatus(idea.status);
            statusStyle();
  }, [idea, status]);

  useEffect(() => {
    textareaHeight()
  },[description])
  const getIdea = () => {
    axios.get(IdeasAPI + `/` + id).then((res) => {
      setIdea(res.data);
      console.log(id);
      
    });
  };
  const statusStyle = () => {
    if (status == "Pending") {
        setStatusText(" text-[#FFB056]");
        setCircle(" bg-[#FFB056]");
      } else if (status == "Approved") {
        setStatusText(" text-[#65A97C]");
        setCircle(" bg-[#65A97C]");
      } else if (status == "Rejected") {
        setStatusText(" text-[#FA5252]");
        setCircle(" bg-[#FA5252]");
      }
  };
  const EditAction = () => {
    setEditMode(false);
    setTitleStyle("input input-bordered text-xl w-full md:w-[70vw]");
    setTextStyle("textarea textarea-bordered w-full text-xl");
  };
  const cancelEditAction = () => {
    setEditMode(true);
    setTitleStyle("text-xl w-full my-4 bg-transparent font-semibold");
    setTextStyle("text-xl w-full p-4 bg-transparent");
  };
  const SaveAction = () => {
    if (title != "" || description != "") {
      axios
        .put(EditAPI + `/` + id, {
          title: title,
          description: description,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };
  const textareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto',
        textarea.style.height = `${textarea.scrollHeight}px`
    }
  }
 
  return (
    <div className="flex h-screen">
<div>
              
<Sidebar name={localStorage.getItem('userName')}></Sidebar>
</div>
              
          <div className="flex flex-col p-5 items-center w-full md:items-start">
      

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={titleStyle}
          disabled={editMode}
          />
        <p className={"text-xl font-semibold " + !isApproved ? "hidden" : ""}>
          By {idea.studentName}
        </p>
        <div className="flex items-center self-start ">
        <div className={"w-[35px] h-[35px] rounded-full flex items-center justify-center my-4" + circle}>
              {idea.status == 'Pending'? <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="#fff"  class="icon icon-tabler icons-tabler-filled icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" /></svg> : idea.status == 'Approved'?  <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#fff"
          class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"
          >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
        </svg> : <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="#fff"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" /></svg>}
       
      </div>          <p className={"mx-2 " + statusText}>{idea.status}</p>
        </div>
              <div className="flex items-start w-full md:w-[70vw]">
                  
          <textarea
            ref={textareaRef}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            textareaHeight()
            }}
            className={textStyle}
            style={{ resize: "none" }}
            disabled={editMode}
                  />
                  <div           className={
              isApproved || status == "Rejected"
              ? "hidden"
              : "flex flex-col items-center justify-around"
            }>
                      
                    <button
            onClick={EditAction}
            className={editMode ? "btn btn-circle m-4" : "hidden"}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
              >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
              <path d="M13.5 6.5l4 4" />
            </svg>
          </button>
                  </div>
            </div>
        <div className={status != 'Pending'? '' : 'hidden'}>
          <p>Admin Comment</p>
          <p>{idea.comment}</p>
        </div>
      
        
          <div className={editMode ? "hidden" : "my-4 md:w-[70vw] flex md:justify-center lg:justify-start"}>
            <button onClick={cancelEditAction} className="btn mx-2">
              Cancel
                      </button>
                      <button onClick={cancelEditAction} className="btn btn-outline btn-error mx-2">
              Delete
            </button>
            <button onClick={SaveAction} className="btn mx-2">
              Save changes
            </button>
          </div>
                </div>
    <Bottomnav></Bottomnav>
    </div>
  );
}

export default IdeaPage;
