import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/actions';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import Product from './Product';


class ProductsList extends React.Component {

  componentDidMount(){
    this.props.fetchProducts();
  }

  render(){

    const { isLoading, products } = this.props;

    if (isLoading) {
      return (
        <Container style={{ height: '100vh' }}>
          <div style={{ margin: '0 auto', top: 'calc(50% - 17px)', width: '60px', position: 'relative' }}>
            <PongSpinner />
          </div>
        </Container>
      )
    }

    return (
      <div>
        <main>
        <Container>
          <Row>
            <Col>
              <h1>Product List</h1>
            </Col>
          </Row>

          {products.map(product => (
            <Row key={product.code}>
              <Col>
                <Product {...product}/>
              </Col>
            </Row>
          ))}
        </Container>
        </main>
      </div>
    );
  }
}

const h1Style = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '40px',
  lineHeight: '120%',
  display: 'flex',
  // alignItems: 'center',
  // position: 'absolute',
  width: '215px',
  height: '48px',
  left: '260px',
  top: '132px',
  color: '#2E3942',
}

const mapStateToProps = (state) => ({ isLoading: state.products.isLoading, products: state.products.items });
const mapDispatchToProps = (dispatch) => ({ fetchProducts: () => dispatch(fetchProducts()) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
