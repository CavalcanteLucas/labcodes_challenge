import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/actions';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import Product from './Product';

import '../../../scss/index.scss';


class ProductsList extends React.Component {

  componentDidMount(){
    this.props.fetchProducts();
  }

  render(){

    const { isLoading, products } = this.props;

    let total_items = products.length;
    let total_items_in_stock = 0;
    for (var i = 0; i < total_items; i++) {
      total_items_in_stock += products[i].available_quantity;
    }

    if (isLoading) {
      return (
        <Container style={{ height: '100px' }}>
          <div style={{ margin: '0 auto', top: 'calc(50% - 17px)', width: '60px', position: 'relative' }}>
            <PongSpinner />
          </div>
        </Container>
      )
    }

    return (
      <Container>
          <div className="shop-body-top-wrapper">
            <Row className="align-items-center">
              <Col xs={6} md={8} lg={{ span: 7, offset: 1}}>
                  <h1><strong>Product List</strong></h1>
              </Col>
              <Col xs={6} md={4} lg={{ span: 3 }}>
                <div className="box-inventory-status">
                  <h3><strong>Inventory Status</strong></h3>
                  <p className="inventory"><strong>Single products:</strong> { total_items } </p>
                  <p className="inventory"><strong>Total items in stock:</strong> {{ test_var }} </p>
                </div>
              </Col>
            </Row>
          </div>

          <Row>
            {products.map( (product, index) => (
              index % 2 === 0 ? (
                <Col xs={12} md={6} lg={{span:5, offset:1}} key={product.code}>
                  <Product {...product}/>
                </Col>
              ):(
                <Col xs={12} md={6} lg={{span:5}} key={product.code}>
                  <Product {...product}/>
                </Col>
              )))}
          </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ isLoading: state.products.isLoading, products: state.products.items });
const mapDispatchToProps = (dispatch) => ({ fetchProducts: () => dispatch(fetchProducts()) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);