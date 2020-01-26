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
      // <div id="productlist">
      //   <h1 className="product-list-title">Product List</h1>
      //   <main>
      //     <ul>
      //       <li className="list-item">
      //         <header>
      //           <strong>Name: </strong>
      //           <spam>Item Name</spam>
      //         </header>
      //       </li>
      //     </ul>
      //   </main>
      // </div>

      <div>
        <Container>
          <div className="product-list-header">
            <h1 className="product-list-title">Product List</h1>
            {/* <h1 className="product-list-title">test</h1> */}
          </div>
          
          <productlist>
            {/* <ul>
              <li className="product-item">
                <header>
                  <p>Name</p>
                  <div className="product-name">product name</div>
                </header>
                <strong>code:</strong>
                <li className="product-category">category:</li>
              </li>
            </ul> */}

          {products.map(product => (
            <Row key={product.code}>
              <Col>
                <Product {...product}/>
              </Col>
            </Row>
          ))}
          </productlist>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isLoading: state.products.isLoading, products: state.products.items });
const mapDispatchToProps = (dispatch) => ({ fetchProducts: () => dispatch(fetchProducts()) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
