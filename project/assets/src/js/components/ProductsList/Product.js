import React from 'react';
import { Link } from 'react-router-dom';

// import ProductDetail from '../ProductDetail';


// export default function {
//   data() {
//     return {
//       componentKey: 0,
//     };
//   },
//   methods: {
//     forceRerender() {
//       this.componentKey += 1;  
//     }
//   }
// }
// state = {
//   uniqueValue: 1
// }

// const Link = (props) => {
//   const onClick = (e) => {
//       const aNewTab = e.metaKey || e.ctrlKey;
//       const anExternalLink = props.href.startsWith('http');

//       if (!aNewTab && !anExternalLink) {
//           e.preventDefault();
//           history.push(props.href);
//       }
//   };

//   return (
//       <a href={props.href} onClick={onClick}>
//           {props.children}
//       </a>
//   );
// };

// import { BrowserRouter as Router, Route } from "react-router-dom";

// const Button = () => (
//   <Route render={({ history}) => (
//     <button
//       type='button'
//       onClick={() => { history.push('/projects/all') }}
//     >
//       go proj
//     </button>
//   )} />
// )

export default function Product(props){

  return (
    
    <div className="item-box-container">
    <div >
    <dl className="item-box-header">
      <dt className="name">Name:</dt>
      <dd className="name">{props.name}</dd>
    </dl>
    </div>
    <p className="separator"></p>
    <div className="item-box-body">
      <dl className="item-box-body">
        <div className="code">
          <dt className="code">Code: </dt>
          <dd className="code">{props.code}</dd>
        </div>
        <div className="category">
          <dt className="category">Category:</dt>
          <dd className="category">{props.category}</dd>
        </div>
        </dl>
        <div className="detail-buttom">
          <Link to={`/${props.code}/`}>
          {/* <Link to={`/${props.code}/`} onClick={() => window.location.reload()}> */}
          {/* <Link to={`/${props.code}/`} onPress={this.refreshScreen}> */}
          {/* <Link to={{ pathname: `/${props.code}/`, state: 'flushDeal' }}> */}
          {/* <Link to={{ pathname: `/${props.code}/` }} component={ProductDetail}> */}
          {/* <Link to={{ pathname: `/${props.code}/`, state: {from:props.location} }}> */}
          {/* <Button>asdf</Button> */}
            <p className="detail-buttom">See Details</p>
            {/* <button onClick={() => { history.push('/projects/all') }}>See Details</button> */}
          </Link>
        </div>

    </div>
    </div>
  );
}
 

// onClick={() => {this.setState({ key: Math.random() });}}