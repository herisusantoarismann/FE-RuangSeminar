import React, { Component, Fragment } from "react";
import { Button, Gap } from "../../../Component";
import "./style.scss";

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoading: true,
    items: [],
    error: null,
  };

  fetchUsers() {
    fetch("http://universities.hipolabs.com/search?name=middle")
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error in loading</div>;
    } else if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      return (
        <Fragment>
          <div className="container">
            <div className="detail">
              <h3>Detail Seminar</h3>
              <p>Heri</p>
              <p>Heri</p>
              <p>Heri</p>
              <div className="btn-detail">
                <Button title="Tambah" buttonStyle="btn--success--solid" />
                <Gap width={20} />
                <Button title="Tambah" buttonStyle="btn--danger--solid" />
              </div>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Nama</td>
                    <td>Pemateri</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.country}</td>
                      <td className="btn-action">
                        <Button
                          title="Tambah"
                          buttonStyle="btn--success--solid"
                        />
                        <Gap width={20} />
                        <Button
                          title="Tambah"
                          buttonStyle="btn--danger--solid"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Detail;
