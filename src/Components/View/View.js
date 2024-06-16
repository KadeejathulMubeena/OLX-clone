import React, { useContext, useState, useEffect } from 'react';
import './View.css';
import { PostContext } from '../../Store/PostContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        console.log("UserId from postDetails:", userId); 
        const userRef = collection(db, "Users");
        const q = query(userRef, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);
  
        console.log("Number of matching user documents:", querySnapshot.size);
  
        querySnapshot.forEach(doc => {
          console.log("User document data:", doc.data());
          setUserDetails(doc.data());
        });
        if (querySnapshot.empty) {
          console.log("No matching user documents.");
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      } 
    };
  
    if (postDetails) {
      fetchUserDetails();
    }
  }, [postDetails]);
  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}

export default View;
