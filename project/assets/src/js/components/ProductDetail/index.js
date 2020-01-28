import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchProduct, fetchLog } from '../../store/actions';

import './arrow.scss';
import api from 'react-redux-api-tools/dist/api';

class ProductsDetail extends React.Component {

  componentDidMount(){
    const { code } = this.props.match.params;
    this.props.fetchProduct(code);
    // this.props.fetchLog();
  }

  render(){
    const { isLoading, product } = this.props;

    // producing the dates

    function date_to_string(date){
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0');
      let yyyy = date.getFullYear();
      return (dd + '/' + mm + '/' + yyyy);
    }

    let date = new Date();
    let string_today = date_to_string(date);
    date.setDate(date.getDate()-1)
    let string_yesterday = date_to_string(date);
    date.setDate(date.getDate()-1)
    let string_before_yesterday = date_to_string(date);



    // getLog
    
    const api_url = "http://127.0.0.1:8000/api/inventory/log/";

    async function fetchLog(){
      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);
    }

    fetchLog();

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
            <div className="io-history-day">
              <p className="io-date">{string_today}</p>
              <p className="io-input">input</p>
              <p className="io-output">output</p>
            </div>
            <div className="io-history-day">
              <p className="io-date">{string_yesterday}</p>
              {/* <div className="value-box"> */}
                <p className="io-input"><i className="icono-arrow2-down"></i>20</p>
                <p className="io-output"><i className="icono-arrow2-up"></i>10</p>
              {/* </div> */}
            </div>
            <div className="io-history-day">
              <p className="io-date">{string_before_yesterday}</p>
              <p className="io-input">input</p>
              <p className="io-output">output</p>
            </div>
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
