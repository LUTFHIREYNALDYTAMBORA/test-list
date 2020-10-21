import React, { Component } from "react";
import axios from "axios";

export default class index extends Component {
  state = {
    data: [],
    name: ''
  };

  componentDidMount() {
    this._eventListener();
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  }

  _eventListener = () => {
    axios
    .get("http://18.139.50.74:8080/checklist", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W119.i2OVQdxr08dmIqwP7cWOJk5Ye4fySFUqofl-w6FKbm4EwXTStfm0u-sGhDvDVUqNG8Cc7STtUJlawVAP057Jlg",
      },
    })
    .then((res) => {
      this.setState({ data: res.data && res.data.data });
      console.log(res);
    });
  }

  _handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })
  }

  _handleAddChecklist = () => {
      console.log(this.state.name);
      const data = {
          name: this.state.name
      }

      const options ={
        headers: {
            'Content-Type': 'application/json',
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W119.i2OVQdxr08dmIqwP7cWOJk5Ye4fySFUqofl-w6FKbm4EwXTStfm0u-sGhDvDVUqNG8Cc7STtUJlawVAP057Jlg",
        }
      }

      axios
      .post("http://18.139.50.74:8080/checklist", 
          data,
        options
      )
      .then((res) => {
        this._eventListener()
        this.setState({ name: ''})
      })
      .catch((err) => {
        console.log(err);
      });
  }


  _handleDeleteParent = (id) => {
    console.log(id);


    const options ={
      headers: {
          'Content-Type': 'application/json',
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W119.i2OVQdxr08dmIqwP7cWOJk5Ye4fySFUqofl-w6FKbm4EwXTStfm0u-sGhDvDVUqNG8Cc7STtUJlawVAP057Jlg",
      }
    }

    axios
    .delete(`http://18.139.50.74:8080/checklist/${id}`, 
      options
    )
    .then((res) => {
      this._eventListener()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
          <div>
              <input onChange={this._handleChange} name="name" type="text" placeholder="Add Checklist" value={this.state.name}/>
          <button onClick={this._handleAddChecklist}>Add</button>
              </div>
        {data.map((val, idx) => {
          return (
            <ul style={{listStyle:"none"}}>
              <li >
                <label>
                  <input type="checkbox" value="" />
                  {val.name}
                  <span style={{margin:'50px'}}>
                      <button style={{background: 'red'}} onClick={() => this._handleDeleteParent(val.id)}>delete parent</button>
                  </span>
                </label>
                <ul>
                    {val.items && val.items.length && val.items.map((name) => (

                  <li style={{listStyle:"none"}}>
                    <label>
                      <input type="checkbox" value="" />
                      {name.name}
                      <span style={{margin:'50px'}}>
                      <button style={{background: 'blue'}}>delete child</button>
                  </span>
                    </label>
                  </li>
                    ))}
                </ul>
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}
