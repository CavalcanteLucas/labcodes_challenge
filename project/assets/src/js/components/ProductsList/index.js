import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/actions';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import Product from './Product';


import './productlist.scss';

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
    // console.log(total_items_in_stock)

    console.log(products)

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
      <div>
        <Container>
          <div className="product-list-header">
            <h1 className="big-title">Product List</h1>
            <div className="inventory-status-container">
              <h3 className="small-title">Inventory Status</h3>
              <h4 className="statuses">Single products: { total_items } </h4>
              <h4 className="statuses">Total items in stock: { total_items_in_stock } </h4>
            </div>
          </div>
          
          <div className="product-list-body">
            {products.map(product => (
              <Row key={product.code}>
                <Col>
                  <Product {...product}/>
                </Col>
              </Row>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isLoading: state.products.isLoading, products: state.products.items });
const mapDispatchToProps = (dispatch) => ({ fetchProducts: () => dispatch(fetchProducts()) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
