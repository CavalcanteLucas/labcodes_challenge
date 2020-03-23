import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

export default function Product(props){

  return (
    <div className="product-item-list">
            <dt>Name:</dt>
            <h2><strong>{props.name}</strong></h2>
        <p className="separator"></p>
        <Row>
          <Col xs={7} md={6} xl={7}>
            <p className="regular"><strong>Code:</strong> {props.code}</p>
            <p className="regular"><strong>Category:</strong> {props.category}</p>
          </Col>
          <Col xs={{ span: 4, offset: 1}} md={5} xl={4} className="align-self-end">
            <Button href={`/${props.code}/`} className="btn">See Details</Button>
          </Col>
        </Row>
    </div>
  );
}