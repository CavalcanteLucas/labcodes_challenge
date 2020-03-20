import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchProduct, fetchLog } from '../../store/actions';
import '../../../scss/arrow.scss';

function sum(total,num) {
  return total + num;
}

function income(l) {
  return l.income;
}

function outcome(l) {
  return l.outcome;
}

function dateToString(date){
// producing date strings for I/O history
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  return (dd + '/' + mm + '/' + yyyy);
}

function dateConvertFormat(date){
  let [yyyy,mm,dd] = date.split('-');
  return (dd + '/' + mm + '/' + yyyy)
}


// export default getValues;
var date = new Date();
const today = date;
var today_string = dateToString(today);
date.setDate(date.getDate()-1)
const yesterday = date;
var yesterday_string = dateToString(yesterday);
date.setDate(date.getDate()-1)
const beforeYesterday = date;
var beforeYesterday_string = dateToString(beforeYesterday);


class ProductsDetail extends React.Component {

  componentDidMount(){
      const { code } = this.props.match.params;
      this.props.fetchProduct(code);
      this.props.fetchLog();
  }

  render(){
    
    const { isLoading, product, log } = this.props;

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

      // dispatching io from log
      let today_income=0;
      let today_outcome=0;
      let yesterday_income=0;
      let yesterday_outcome=0;
      let beforeYesterday_income=0;
      let beforeYesterday_outcome=0;

      let filteredLog = log.filter(it => 
        it.code == product.code);

      const todayLog           = filteredLog.filter(it => 
        dateConvertFormat(it.date) == today_string);
      const yesterdayLog       = filteredLog.filter(it => 
        dateConvertFormat(it.date) == yesterday_string);
      const beforeYesterdayLog = filteredLog.filter(it => 
        dateConvertFormat(it.date) == beforeYesterday_string);

      if (todayLog.length) {
        today_income            = todayLog.map(income).reduce(sum);
        today_outcome           = todayLog.map(outcome).reduce(sum);
      }
      if (yesterdayLog.length) {
        yesterday_income        = yesterdayLog.map(income).reduce(sum);
        yesterday_outcome       = yesterdayLog.map(outcome).reduce(sum);
      }
      if (beforeYesterdayLog.length) {
        beforeYesterday_income  = beforeYesterdayLog.map(income).reduce(sum);
        beforeYesterday_outcome = beforeYesterdayLog.map(outcome).reduce(sum);
      }

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
                    <p className="io-income"><strong>{today_income > 0 ? <div><i className="icono-arrow2-down"></i>{today_income}</div> : '---'}</strong></p>
                    <p className="io-outcome"><strong>{today_outcome != 0 ? <div><i className="icono-arrow2-up"></i>{today_outcome}</div>: '---'}</strong></p>
                  </div>
                  <div className="io-history-day">
                    <p className="io-date">{yesterday_string}</p>
                    <p className="io-income"><strong>{yesterday_income !=0 ? <div><i className="icono-arrow2-down"></i>{yesterday_income}</div> : '---'}</strong></p>
                    <p className="io-outcome"><strong>{yesterday_outcome !=0 ? <div><i className="icono-arrow2-up"></i>{yesterday_outcome}</div> : '---'}</strong></p>
                  </div>
                  <div className="io-history-day">
                    <p className="io-date">{beforeYesterday_string}</p>
                    <p className="io-income"><strong>{beforeYesterday_income !=0 ? <div><i className="icono-arrow2-down"></i>{beforeYesterday_income}</div> : '---'}</strong></p>
                    <p className="io-outcome"><strong>{beforeYesterday_outcome !=0 ? <div><i className="icono-arrow2-up"></i>{beforeYesterday_outcome}</div> : '---'}</strong></p>
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
    log: state.products.log
  }
};

const mapDispatchToProps = (dispatch) => ({ 
  fetchProduct: (code) => dispatch(fetchProduct(code)),
  fetchLog: () => dispatch(fetchLog())
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);