import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchProduct , fetchLog } from '../../store/actions';

import '../../../scss/arrow.scss';
import api from 'react-redux-api-tools/dist/api';

// import TimerMixin from 'react-timer-mixin'; 


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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isFlushed: false
  //   };
  // }

  // componentWillReceiveProps(nextProps) {
  //   // check current props and nextPros of dealLoaded flag. If dealLoaded was false, and is true, which means the data is fetched, then we should reset isFlushed
  //   if (!this.props.dealLoaded && nextProps.dealLoaded) {
  //     this.setState({
  //       isFlushed: false
  //     });
  //   }
  //   // since we assigned the location.state in <Link>, if we see this prop, and the data is not flushed yet, then flush data, in this case we call loadDeals(), which is a redux action
  //   if (!this.state.isFlushed && (nextProps.location.state === 'flushDeal')) {
  //     this.setState({
  //       isFlushed: true,
  //     }, () => this.props.loadDeals());
  //   }
  // }

  // state = {
  //   magicNumber: 23,
  // }

  // componentWillUpdate(){
  //   window.location.reload();
  // }

  componentDidMount(){
      // window.location.reload();
      // this.forceUpdate();
      const { code } = this.props.match.params;
      this.props.fetchProduct(code);
      this.props.fetchLog();
      // onClick={() => window.location.reload()}
      // TimerMixin.setTimeout(() => { 
      //   this.props.fetchProduct(code);
      //   console.log('ji')
      //  },2000);
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
        <Container>
          <div className="product-description-header">
            <Row>
              <Link to='/'>
                <i className="icono-arrow1-left"></i>
              </Link><h1 className="big-title">{product.name}</h1>
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
              <p className="io-date">{today_string}</p>
              <p className="io-input">{today_income > 0 ? <div><i className="icono-arrow2-down"></i>{today_income}</div> : '---'}</p>
              <p className="io-output">{today_outcome != 0 ? <div><i className="icono-arrow2-up"></i>{today_outcome}</div>: '---'}</p>
            </div>
            <div className="io-history-day">
              <p className="io-date">{yesterday_string}</p>
              <p className="io-input">{yesterday_income !=0 ? <div><i className="icono-arrow2-down"></i>{yesterday_income}</div> : '---'}</p>
              <p className="io-output">{yesterday_outcome !=0 ? <div><i className="icono-arrow2-up"></i>{yesterday_outcome}</div> : '---'}</p>
            </div>
            <div className="io-history-day">
              <p className="io-date">{beforeYesterday_string}</p>
              <p className="io-input">{beforeYesterday_income !=0 ? <div><i className="icono-arrow2-down"></i>{beforeYesterday_income}</div> : '---'}</p>
              <p className="io-output">{beforeYesterday_outcome !=0 ? <div><i className="icono-arrow2-up"></i>{beforeYesterday_outcome}</div> : '---'}</p>
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


// const ProductsDetailWithRouter = withRouter(ProductsDetail);
// export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetailWithRouter);
