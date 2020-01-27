import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchProduct } from '../../store/actions';

import './product.scss';

import './arrow.scss';

class ProductsDetail extends React.Component {

  componentDidMount(){
    const { code } = this.props.match.params;
    this.props.fetchProduct(code);
  }

  render(){
    const { isLoading, product } = this.props;

    if (isLoading) {
      return (
        <Container style={{ height: '100vh' }}>
          <div style={{ margin: '0 auto', top: 'calc(50% - 17px)', width: '60px', position: 'relative' }}>
            <PongSpinner />
          </div>
        </Container>
      )
    }

    if (product) {
      return (
        <Container>
         

          <div className="product-description-header">
            <Row>
              <Link to='/'><i className="icono-arrow1-left"></i></Link><h1 className="big-title">{product.name}</h1>
            </Row>
          </div>

          <div className="product-description-body">
          <div className="item-box-description-container">
            <div className="item-box-description">
            <div className="item-box-body">
              <dl className="item-box-body">
              <div className="code">
                <dt className="code">Code: </dt>
                <dd className="code">{product.code}</dd>
              </div>
              <div className="category">
                <dt className="category">Category:</dt>
                <dd className="category">{product.category}</dd>
              </div>
              <div className="description">
                <dt className="description">Description:</dt>
                <dd className="description">{product.description}</dd>
              </div>
              </dl>
            </div>
            </div>
          </div>

          <div className="quantity-white-box">
          <div className="quantity-box"> 
          <dl>
            <dd className="quantity-available">Quantity Available:</dd>
            <dt className="quantity-available">{product.available_quantity}</dt>
            <dd className="io-history">I/O History</dd>
          </dl>

          </div>
          </div>
          </div>  
        </Container>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => ({ isLoading: state.products.isLoading, product: state.products.selectedItem });
const mapDispatchToProps = (dispatch) => ({ fetchProduct: (code) => dispatch(fetchProduct(code)) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);
