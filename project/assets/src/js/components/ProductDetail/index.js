import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchProduct, fetchLog } from '../../store/actions';
import '../../../scss/arrow.scss';

// set date strings
var date = new Date();
const today = date;
date.setDate(date.getDate()-1);
const yesterday = date;
date.setDate(date.getDate()-1);
const beforeYesterday = date;

var today_string = today.toLocaleDateString('pt-BR');
var yesterday_string = yesterday.toLocaleDateString('pt-BR');
var beforeYesterday_string = beforeYesterday.toLocaleDateString('pt-BR');

class ProductsDetail extends React.Component {

  componentDidMount(){
      const { code } = this.props.match.params;
      this.props.fetchProduct(code);
  }

  render(){

    const { isLoading, product, io_log } = this.props;

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
        <div id="product-detail">
          <Container>
            <div className="shop-body-top-wrapper">
              <Row>
                <Col lg={{ offset: 1 }}>
                  <div className="align-items-center detail-top-content">
                    <Link to='/'><i className="icono-arrow1-left"></i></Link>
                    <h1><strong>{product.name}</strong></h1>
                  </div>
                </Col>
              </Row>
            </div>

            <Row>
              <Col xs={12} md={8} lg={{ span: 6, offset: 1}}>
                <div className="wrapper-product-detail">
                    <div className="box-item-detail">
                        <p className="regular"><strong>Code: </strong>{product.code}</p>
                        <p className="regular"><strong>Category: </strong>{product.category}</p>
                        <div className="description-title"><strong>Description: </strong>
                          {product.description ? 
                            <p className="available"> {product.description}</p> 
                            :
                            <p className="unavailable"> Unavailable</p>
                          }
                        </div>
                    </div>
                </div>
              </Col>

              <Col xs={9} md={{ span: 4}} lg={{ span: 3}}>
                <div className="box-quantity">
                  <h3 className="quantity"><strong>Quantity Available:</strong></h3>
                  <h1><strong>{product.available_quantity}</strong></h1>
                  <p className="separator"></p>
                  <h3 className="history"><strong>I/O History</strong></h3>
                  <div className="io-history-day">
                    <p className="io-date">{today_string}</p>
                    <div className="io-income"><strong>{io_log.today_income > 0 ? <div><i className="icono-arrow2-down"></i>{io_log.today_income}</div> : '---'}</strong></div>
                    <div className="io-outcome"><strong>{io_log.today_outcome != 0 ? <div><i className="icono-arrow2-up"></i>{io_log.today_outcome}</div>: '---'}</strong></div>
                  </div>
                  <div className="io-history-day">
                    <p className="io-date">{yesterday_string}</p>
                    <div className="io-income"><strong>{io_log.yesterday_income !=0 ? <div><i className="icono-arrow2-down"></i>{io_log.yesterday_income}</div> : '---'}</strong></div>
                    <div className="io-outcome"><strong>{io_log.yesterday_outcome !=0 ? <div><i className="icono-arrow2-up"></i>{io_log.yesterday_outcome}</div> : '---'}</strong></div>
                  </div>
                  <div className="io-history-day">
                    <p className="io-date">{beforeYesterday_string}</p>
                    <div className="io-income"><strong>{io_log.beforeYesterday_income !=0 ? <div><i className="icono-arrow2-down"></i>{io_log.beforeYesterday_income}</div> : '---'}</strong></div>
                    <div className="io-outcome"><strong>{io_log.beforeYesterday_outcome !=0 ? <div><i className="icono-arrow2-up"></i>{io_log.beforeYesterday_outcome}</div> : '---'}</strong></div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return { 
    isLoading: state.products.isLoading, 
    product: state.products.selectedItem,
    io_log: state.products.io_log
  }
};

const mapDispatchToProps = (dispatch) => ({ 
  fetchProduct: (code) => dispatch(fetchProduct(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);