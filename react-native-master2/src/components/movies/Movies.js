import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { API_BASE_URL } from "../../config";
import ReactDOM from "react-dom";
import MaterialTable from "../../../node_modules/material-table";
import {
  AccessAlarm,
  ThreeDRotation,
  SettingsInputCompositeSharp,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

// import MaterialTable from "material-table";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loaded: true,
      error: null,
    };
  }
  baseURL = API_BASE_URL + "/movies";

  getData = (ev) => {
    this.setState({ loaded: false, error: null });
    let url = this.baseURL;

    let req = new Request(url, {
      method: "GET",
    });

    fetch(req)
      .then((response) => response.json())
      .then(this.showData)
      .catch(this.badStuff);
  };
  showData = (data) => {
    this.setState({ loaded: true, data });
    console.log(data);
  };
  badStuff = (err) => {
    this.setState({ loaded: true, error: err.message });
  };
  onDelete(id) {
    this.setState({ loaded: false, error: null });
    let url = this.baseURL + "/" + id;

    let req = new Request(url, {
      method: "DELETE",
    });

    fetch(req).then(this.showData).then(this.getData);
  }
  onIncrease(id) {
    this.setState({ loaded: false, error: null });
    let url = this.baseURL + "/" + id + "/count";

    let req = new Request(url, {
      method: "POST",
    });

    fetch(req).then(this.showData).then(this.getData);
  }
  render() {
    return (
      <ScrollView>
        {!this.state.loaded && <Text>LOADING</Text>}
        <br></br>
        <Button title="lISTADO DE PELICULAS" onPress={this.getData} />
        <br></br>
        {this.state.error && <Text style={styles.err}>{this.state.error}</Text>}
        {this.state.data &&
          this.state.data.length > 0 &&
          this.state.data.map((comment) => (
            <Text key={comment.id}>
              <table>
                <tr>
                  <td>
                    <h1>{comment.title}</h1>
                  </td>
                </tr>
                <td>
                  <h2>Sinopsis</h2>
                  {comment.sinopsis}
                </td>
                <tr>
                  <td>
                    <br></br>
                    {comment.image}
                  </td>
                </tr>

                <tr>
                  <td>
                    <IconButton
                      onClick={() => this.onDelete(comment.id)}
                      color="secondary"
                    >
                      <SvgIcon>
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </SvgIcon>
                    </IconButton>
                  </td>
                  <td>{comment.count}</td>
                  <td>
                    <IconButton
                      color="primary"
                      onClick={() => this.onIncrease(comment.id)}
                    >
                      <SvgIcon>
                        <path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
                      </SvgIcon>
                    </IconButton>
                  </td>
                </tr>
              </table>
              <hr style={{ width: 360, height: 2 }} color="black"></hr>
            </Text>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 24,
    color: "#333",
  },
  err: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
  },
});
