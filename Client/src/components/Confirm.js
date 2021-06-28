import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import api from '../api';

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };


  onSubmitHandler = async event => {
    //event.preventDefault();
    
    var payload = this.props.values;

    console.log(payload);
    
    
    await api.signup(payload).then(res => {
        console.log("seee meeee", res.data.token);
        //window.alert(`user signed in`)
        if (typeof Storage !== "undefined") {
            localStorage.removeItem("JWT");
            localStorage.removeItem("content")
            localStorage.removeItem("time")
            localStorage.setItem("JWT", res.data.token);
        }

        if (typeof Storage !== "undefined") {
            if (localStorage.getItem("JWT") !== null) {
                // If there's something, try to parse and sign the current user in.
                console.log("getting", localStorage.getItem("JWT"))
                api.verifyJWT({token:localStorage.getItem("JWT")}).then(res=> {
                    console.log("verified", res.data)
                })        
            }
        }


    })
    .then(() => {
        this.continue();
    })
    .catch( (error) => {
        console.log("error---", error.response);
    })

  }


  render() {
    const {
      values: { Name, email, address, phone }
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Confirm User Data" />
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={Name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Address" secondary={address} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone" secondary={phone} />
              </ListItem>
            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.onSubmitHandler({Name, email, address, phone})}
            >Confirm & Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
