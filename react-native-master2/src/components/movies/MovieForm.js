import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { StyleSheet, View, SafeAreaView, Text, Alert } from "react-native";
import { withAuth } from "@okta/okta-react";
import { API_BASE_URL } from "../../config";
import Movies from "./Movies";
import { blue } from "@material-ui/core/colors";
import { colors } from "@material-ui/core";
export default withAuth(
  class MovieForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        sinopsis: "",
        image: "",
        errorMessage: "",
        error: false,
        isLoading: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit(e) {
      e.preventDefault();
      this.setState({
        isLoading: true,
        error: false,
        errorMessage: "",
      });

      const response = await fetch(API_BASE_URL + "/movies", {
        method: "POST",
        body: JSON.stringify({
          title: this.state.title,
          sinopsis: this.state.sinopsis,
          image: this.state.image,
        }),
      });
      const data = await response.json();

      if (data.errors) {
        this.setState({
          isLoading: false,
          error: true,
          errorMessage: data.errors,
        });
      } else {
        this.setState({
          title: "",
          sinopsis: "",
          image: "",
          isLoading: false,
          error: false,
          errorMessage: "",
        });
        //this.props.onAddition(data);
      }
    }

    render() {
      return (
        <Form error={this.state.error} onSubmit={this.onSubmit}>
          <div>
            <Form.Field error={this.state.error}>
              <Text>
                <h2> Title </h2>
              </Text>
              <input
                style={{ width: 360, height: 50 }}
                name="title"
                placeholder="Enter movie title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <br></br>
              <Text>
                <h2> Sinopsis </h2>
              </Text>
              <textarea
                style={{ width: 360, height: 100 }}
                name="sinopsis"
                placeholder="Enter movie sinopsis"
                value={this.state.sinopsis}
                onChange={this.handleChange}
              />
              <Text>
                <h2> Seleccione imagen </h2>
              </Text>
              <input
                name="image"
                type="file"
                value={this.state.image}
                onChange={this.handleChange}
              ></input>
              {this.state.error && (
                <Message
                  error
                  header="Error al agregar la película"
                  content={this.state.errorMessage}
                />
              )}{" "}
            </Form.Field>{" "}
          </div>{" "}
          <br></br>
          <Button
            type="submit"
            loading={this.state.isLoading}
            style={{ width: 360, height: 35 }}
            color="#5AA918"
          >
            Agregar pelicula
          </Button>
          <div>
            <Movies></Movies>{" "}
          </div>{" "}
        </Form>
      );
    }
  }
);
