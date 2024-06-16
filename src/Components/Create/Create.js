import React, {Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { db, storage } from '../../firebase/config';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../Store/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const date = new Date()

  const uploadFile =async (e) => {
    e.preventDefault();
    if (!imageUpload) {
      console.log("Please select an image");
      return;
    }
    try {
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
    
       await addDoc(collection(db,"products"),{
        name,
        category,
        price,
        url,
        userId : user.uid,
        createdAt : date.toDateString()
      });
      navigate('/')
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              value = {name}
              onChange={(e)=>setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value = {category}
              onChange={(e)=>setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            id="price" 
            value = {price}
            onChange={(e)=>setPrice(e.target.value)}
            name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={imageUpload ? URL.createObjectURL(imageUpload):''}></img>
          <form>
            <br />
            <input
            label="Image"
            accept="image/png,image/jpeg"
            onChange={(e)=>{
              setImageUpload(e.target.files[0]);
             }}
             type="file"/>
            <br />
            <button onClick={uploadFile}className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
