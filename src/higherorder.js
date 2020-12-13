import React,{Component} from 'react';
import Method from './utils/methods';
import Constants from './utils/constants';


const method = new Method();
const constant = new Constants();
const withApp =(WrappedComponent)=>{
      return class withApp extends Component {
        constructor(props) {
          super(props);
          this.state = { hasError: false };
        }
        componentDidCatch(error, info) {
         // Display fallback UI
          this.setState({ hasError: true,error,info });
          console.trace(info);
          // You can also log the error to an error reporting service
         // logErrorToMyService(error, info);
        }
      
        render() {
          if (this.state.hasError) {
            // You can render any custom fallback UI
            return null;
          }
          return <WrappedComponent constant={constant} method={method} {...this.props}/>;
        }
      }
}
export default withApp;