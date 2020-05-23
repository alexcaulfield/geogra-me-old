import React, {Component} from 'react';
import {db} from './../fire-config'
import { USERS_COLLECTION } from './../utils'
import * as firebase from 'firebase'
import {Icon, Message, Segment} from "semantic-ui-react";
import {isMobile} from "react-device-detect";
import ErrorMessage from "./error_message";
import {Link, withRouter} from "react-router-dom";

class GeneralProfile extends Component {
  state = {
    profileId: this.props.userId,
    publicProfile: false,
    isLoading: true,
    userExists: false,
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    db.collection(USERS_COLLECTION).where("username", "==", this.state.profileId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          this.setState({
            isLoading: false,
          })
        }
        const _thisRef = this;
        querySnapshot.forEach(function(doc) {
          const data = doc.data()
          if (_thisRef.props.appUserEmail === data.email) {
            _thisRef.props.history.push('/profile');
          }
          if (data.publicProfile) {
            _thisRef.setState({
              placesBeen: data.placesBeen,
              placesToGo: data.placesToGo,
              countriesBeen: data.countriesBeen.length,
              userExists: data.username === _thisRef.state.profileId,
              isLoading: false,
              publicProfile: data.publicProfile,
            })
          } else {
            _thisRef.setState({
              userExists: data.username === _thisRef.state.profileId,
              isLoading: false,
            })
          }
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return (
      <>
        {!this.state.publicProfile && !this.state.isLoading && this.state.userExists &&
          <ErrorMessage
            header='Private Profile'
            message="This user's profile is private, please contact them to make their profile public"
          />
        }
        {!this.state.isLoading && !this.state.userExists &&
          <ErrorMessage
            header='User does not exist'
            message={
              <>
                We couldn't find any information on this user. Please visit our {<Link to='/'>homepage</Link>}!
              </>
            }
          />
        }
        {this.state.publicProfile && !this.state.isLoading && this.state.userExists &&
          <ErrorMessage
            header='User Exists'
            message="Yay!"
          />
        }
      </>
    )
  }
}

export default withRouter(GeneralProfile);