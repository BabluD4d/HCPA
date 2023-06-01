import $ from "jquery";
import ReactDOM from "react-dom";
import React, { Component, createRef } from "react";
// import "./styles.css";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

let formData = [
  {
    type: "header",
    subtype: "h1",
    label: "CheckList",
    access: false,
  },
  {
    type: "radio-group",
    required: true,
    label: "Q.1  Legal Name of Application",
    inline: true,
    name: "radio-group-1683003347823-0",
    access: true,
    other: false,
    role: "1",
    values: [
      {
        label: "MR",
        value: "Mr",
        selected: true,
      },
      {
        label: "Miss",
        value: "Miss",
        selected: false,
      },
      {
        label: "MS",
        value: "Ms",
        selected: false,
      },
      {
        label: "Mrs",
        value: "Mrs",
        selected: false,
      },
    ],
  },
  {
    type: "text",
    required: true,
    label: "Q.2 Trending name",
    className: "form-control",
    name: "text-1683003614731-0",
    access: false,
    subtype: "text",
  },
  {
    type: "checkbox-group",
    required: false,
    label: "Q.3  GST Registration",
    toggle: false,
    inline: false,
    name: "checkbox-group-1683003705213-0",
    access: false,
    other: false,
    values: [
      {
        label: "Yes",
        value: "yes",
        selected: false,
      },
      {
        label: "No",
        value: "no",
        selected: true,
      },
    ],
  },
  {
    type: "file",
    required: false,
    label: "Please Upload your profile pick",
    className: "form-control",
    name: "file-1683005649446-0",
    access: false,
    subtype: "file",
    multiple: false,
  },
  {
    type: "date",
    required: false,
    label: "Date Field",
    className: "form-control",
    name: "date-1683005701919-0",
    access: false,
    value: "2023-05-16",
  },
  {
    type: "select",
    required: false,
    label: "Select",
    className: "form-control",
    name: "select-1683005771478-0",
    access: false,
    multiple: false,
    values: [
      {
        label: "Option 1",
        value: "option-1",
        selected: true,
      },
      {
        label: "Option 2",
        value: "option-2",
        selected: false,
      },
      {
        label: "Option 3",
        value: "option-3",
        selected: false,
      },
    ],
  },
  {
    type: "autocomplete",
    required: false,
    label: "Autocomplete",
    className: "form-control",
    name: "autocomplete-1683005749219-0",
    access: false,
    requireValidOption: false,
    values: [
      {
        label: "Option 1",
        value: "option-1",
        selected: true,
      },
      {
        label: "Option 2",
        value: "option-2",
        selected: false,
      },
      {
        label: "Option 3",
        value: "option-3",
        selected: false,
      },
    ],
  },
  {
    type: "number",
    required: false,
    label: "Number",
    className: "form-control",
    name: "number-1683005791900-0",
    access: false,
  },
  {
    type: "paragraph",
    subtype: "p",
    label: "Paragraphujkmy,k,uykrtkukym",
    className: "kjuykuk",
    access: false,
  },
  {
    type: "textarea",
    required: false,
    label: "Text Area",
    className: "form-control",
    name: "textarea-1683005784519-0",
    access: false,
    subtype: "textarea",
  },
  {
    type: "button",
    label: "Submit",
    subtype: "button",
    className: "btn-success btn",
    name: "button-1683005722001-0",
    access: false,
    style: "success",
  },
];

class FormBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.EditData?this.props.EditData:"",
    };
  }

  fb = createRef();

  componentDidMount() {
    setTimeout(() => {
      if (this.props.EditData) {
        let formData = this.props.EditData;
        $(this.fb.current).formBuilder({formData});
        // alert(1)
      } else {
        // alert(2)
        $(this.fb.current).formBuilder({ formData });
      }
    },1000);
  }

  getFormData() {
    const formData = $(this.fb.current).formBuilder("getData", "json");
    this.setState({ formData });
    localStorage.setItem("Checklist", JSON.stringify(formData));
    this.props.GetDataTogle(formData);
  }
  getFormData1() {
    const formData = $(this.fb.current).formBuilder("getData", "json");
    this.setState({ formData });
    localStorage.setItem("Checklist", JSON.stringify(formData));
    this.props.GetData(formData);
  }
  render() {
    return (
      <div> <div id="fb-editor" ref={this.fb} />
        
       
      </div>
    );
  }
}

export default FormBuilder;
