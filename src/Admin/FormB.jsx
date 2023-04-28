import $ from "jquery";
import ReactDOM from "react-dom";
import React, { Component, createRef } from "react";
// import "./styles.css";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

 const formData = [
 
];


class FormBuilder extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formData: {}
      };
    }
  
    fb = createRef();
    
    componentDidMount() {
      $(this.fb.current).formBuilder({ formData });
    }
  
    getFormData() {
      const formData = $(this.fb.current).formBuilder('getData', 'json');
      this.setState({ formData });
      console.log(formData)
      this.props.GetData(formData)
    }
  
    render() {
      return (
        <div>
          <div id="fb-editor" ref={this.fb} />
          {/* <button onClick={() => this.getFormData()}>Get Form Data</button>
          <pre>{JSON.stringify(this.state.formData, null, 2)}</pre> */}
        </div>
      );
    }
  }

export default FormBuilder;
