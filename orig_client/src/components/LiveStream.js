'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} = React;

window.navigator.userAgent = "react-native";

var WebRTC = require('react-native-webrtc');
var {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  RTCSetting,
} = WebRTC;

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

var pcPeers = {};
var localStream;

function getLocalStream() {
  console.log('getLocalStream');
  navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
    localStream = stream;
    console.log(typeof stream);
    container.setState({selfViewSrc: stream.toURL()});
    container.setState({status: 'ready', info: 'Please enter or create room ID'});
  }, logError);
}


function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  var array = [];
  for (var key in hash) {
    var obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

var container;

var LiveStream = React.createClass({
  getInitialState: function() {
    return {info: 'Initializing', status: 'init', roomID: '', selfViewSrc: null, remoteList: {}};
  },
  componentDidMount: function() {
    container = this;
    getLocalStream();
  },
  _press(event) {
    this.refs.roomID.blur();
    this.setState({status: 'connect', info: 'Connecting'});
    join(this.state.roomID);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <RTCView streamURL={this.state.selfViewSrc} style={styles.selfView}/>
        {
          mapHash(this.state.remoteList, function(remote, index) {
            return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
          })
        }
      </View>
    );
  }
});

var styles = StyleSheet.create({
  selfView: {
    width: 375,
    height: 450,
  },
  remoteView: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default LiveStream;





// import React, {
//   Component,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// var WebRTC = require('react-native-webrtc');

// var {
//   RTCPeerConnection,
//   RTCMediaStream,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView
// } = WebRTC;

// var localStream;
// var localStreamUrl;

// function getLocalStream() {
//   console.log('getLocalStream');
//   debugger;
//   navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
//     localStream = stream;
//     console.log(typeof stream);
//     localStreamUrl = stream.toURL();
//     // container.setState({status: 'ready', info: 'Please enter or create room ID'});
//     console.log('these are the init values that we are tyring to run the local stream with', localStream, localStreamUrl);
//   }, (err) => console.log(err));
// }


// class LiveStream extends Component {
//   componentWillMount() {
//     // let { initCameraState } = this.props;
//     // debugger;
//     getLocalStream();
//     // console.log(localStream, localStreamUrl);
//   }
//   render() {
//     // let { cameraState } = this.props;
//     return (
//       <View style={styles.container}>
//         <Text> HEY!!!!!! </Text>
//         <RTCView streamURL={localStreamUrl} style={styles.selfView}/>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//     marginTop: 20
//   },
//   selfView: {
//     width: 100,
//     height: 100,
//   },
// });

// export default LiveStream;
