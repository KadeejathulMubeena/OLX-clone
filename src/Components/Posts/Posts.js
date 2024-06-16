import React ,{useEffect,useState,useContext}from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { db } from '../../firebase/config';
import { collection, getDocs } from "firebase/firestore";
import { PostContext } from '../../Store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {

  const [products, setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(()=>{
     getDocs(collection(db, "products")).then((snapshots)=>{
      const allPost = snapshots.docs.map((product)=>{
        return {
          ...product.data(),
          id : product.id
        }
      });
      setProducts(allPost);
    });
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products ? products.map((product)=>{
            return(
              <div 
              onClick={()=>{
                setPostDetails(product);
                navigate('/view');
              }}
              className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          }) : ''}
          
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products ? products.map((product)=>{
            return(
              <div 
              onClick={()=>{
                setPostDetails(product);
                navigate('/view');
              }}
              className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          }) : ''}
        </div>
      </div>
    </div>
  );
}

export default Posts;
