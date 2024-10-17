import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
function PopUp(props) {
    let commentBoxRef = useRef(null);
    let [comment, setComment] = useState("");

    useEffect(() => {
        commentBoxRef.current.focus();
    }, [props.isPopUpOpen]);

    let [isloading, setIsLoading] = React.useState(false);

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function handleConfirm(status) {
        setIsLoading(true);
        axios
            .put("https://670a49a9ac6860a6c2c914c9.mockapi.io/ideas/" + props.id, {
                comment: comment,
                status: status,
            })
            .then((res) => {
                props.getUserData();
                props.setIsPopUpOpen(false);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }

    return (
        <div
            className=" justify-center items-center fixed top-0  w-screen h-screen z-[10]"
            style={props.isPopUpOpen ? { display: "flex" } : { display: "none" }}
        >
            <div className="justify-center items-center fixed top-0  w-screen h-screen bg-slate-950 opacity-70 "></div>
            <div className=" max-w-[700px] relative rounded-lg duration-500 bg-white z-[10] max-sm:w-[85%] w-[34em] p-10 max-sm:h-[20em] h-[23em] flex flex-col items-center mb-28">
                <textarea
                    ref={commentBoxRef}
                    onChange={handleCommentChange}
                    className={`
                        ${props.windowType === "Reject"
                            ? "focus:border-red-400 focus:border-2 focus:outline-none "
                            : "focus:border-green-400 focus:border-2 focus:outline-none "
                        }bg-[#efefef] mb-5 border-[1px] border-gray-400  rounded-lg  mt-2 p-2 resize-none w-[90%] h-[85%] overflow-y-auto `}
                />
                <div className="text-white flex gap-4  w-[100%] justify-center">
                    <button
                        onClick={() => handleConfirm("Approved")}
                        className="p-2 bg-[#65A97C] rounded-md w-[40%]"
                        style={
                            props.windowType === "Reject"
                                ? { display: "none" }
                                : { display: "block" }
                        }
                    >
                        {isloading ? (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    class="inline w-4 h-4 text-gray-200 animate-spin dark:text-white fill-green-500"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <span>Approve</span>
                        )}
                    </button>

                    <button
                        onClick={() => handleConfirm("Rejected")}
                        className="p-2 bg-[#FA5252] rounded-md w-[40%] flex"
                        style={
                            props.windowType === "Reject"
                                ? { display: "block" }
                                : { display: "none" }
                        }
                    >
                        {isloading ? (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    class="inline w-4 h-4 text-gray-200 animate-spin dark:text-white fill-red-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <span>Reject</span>
                        )}
                    </button>

                    <button
                        onClick={() => props.setIsPopUpOpen(false)}
                        className="p-2 border-gray-500 border-[1px] rounded-md text-[#364C84] w-[40%]"
                    >
                        Cancel
                    </button>
                </div>

                <button
                    className=" absolute top-0 right-0 hover:text-white hover:bg-black"
                    onClick={() => props.setIsPopUpOpen(false)}
                >
                    <RxCross2 className="text-2xl m-1" />
                </button>
            </div>
        </div>
    );
}

export default PopUp;
