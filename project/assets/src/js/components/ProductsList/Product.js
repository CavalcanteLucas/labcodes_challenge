import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props){

  return (
    <div className="item-box">
      <dt>Name:</dt>
      <h2><strong>{props.name}</strong></h2>
      <p className="regular"><strong>Code:</strong> {props.code}</p>
      <p className="regular"><strong>Category:</strong> {props.category}</p>
      <a href={`/${props.code}/`} className="btn">See Details</a>
    </div>
  );
}
 

{/* <div className="item-box-container">
<div >
<dl className="item-box-header">
  <dt className="name">Name:</dt>
  <dd className="name">{props.name}</dd>
</dl>
</div>
<p className="separator"></p>
<div className="item-box-body">
  <dl className="item-box-body">
    <div className="code">
      <dt className="code">Code: </dt>
      <dd className="code">{props.code}</dd>
    </div>
    <div className="category">
      <dt className="category">Category:</dt>
      <dd className="category">{props.category}</dd>
    </div>
    </dl>
    <div className="detail-buttom">
      <Link to={`/${props.code}/`}>
        <p className="detail-buttom">See Details</p>
      </Link>
    </div>

</div>
</div> */}