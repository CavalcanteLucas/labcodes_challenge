import React from 'react';
import { Link } from 'react-router-dom';


export default function Product(props){
  return (
    <dl>
      <dt>Name:</dt>
      <dd>{props.name}</dd>
      <dt>Code:</dt>
      <dd>{props.code}</dd>
      {props.description &&
        <React.Fragment>
          <dt>Description:</dt>
          <dd>{props.description}</dd>
        </React.Fragment>
      }
      <dt>Available quantity:</dt>
      <dd>{props.available_quantity}</dd>
      <dt>Category:</dt>
      <dd>{props.category}</dd>
      <dd><Link to={`/${props.code}/`}>See Details</Link></dd>    </dl>
  );
}
 