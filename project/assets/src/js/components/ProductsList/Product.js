import React from 'react';
import { Link } from 'react-router-dom';

import './productlist.scss'

export default function Product(props){
  return (
    <div className="item-box">
    <dl className="item-box">
      <dt className="name">Name:</dt>
      <dd className="name">{props.name}</dd>
      <p className="separator"></p>
      <div className="code">
        <dt className="code">Code: </dt>
        <dd className="code">{props.code}</dd>
      </div>
      {/* {props.description &&
        <React.Fragment>
          <dt>Description:</dt>
          <dd>{props.description}</dd>
        </React.Fragment>
      } */}
      {/* <dt>Available quantity:</dt>
      <dd>{props.available_quantity}</dd> */}
      <div className="category">
        <dt className="category">Category:</dt>
        <dd className="category">{props.category}</dd>
      </div>
      {/* <div className="detail-buttom">
        <Link to={`/${props.code}/`}>
          <p className="detail-buttom">See Details</p>
        </Link>
      </div> */}
    </dl>
    </div>
  );
}
 