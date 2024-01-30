// import React, { Component } from 'react';

// export default class LiveStream extends Component {
//   constructor() {
//     super();

//   }

//   componentDidMount() {
//     if (this.state.stream.id) {
//       const currentStreamRef = this.streamsRef.child(`current/${this.state.stream.id}`)
//       currentStreamRef.on('child_changed', function (snapshot) {
//         const updateStatus = snapshot.val().status;
//         if (updateStatus !== ('' || null)) {
//           this.setState(prevState => ({
//             stream: {
//               ...prevState.stream,
//               status: updateStatus
//             }
//           }))
//         }
//       })
//     }
// this.getStream();
// this.getRecentStreams();

// this.socket = io();

// this.socket.on('stream_update', (stream) => {
//   if (stream.status === 'idle') {
//     this.getRecentStreams();
//   }
//   this.setState({ stream })
// })
// }

// createStream = () => {
//   const url = `${baseUrl}/create-stream`
//   this.setState({ isLoading: true })
//   axios.post(url, {}, { headers: { 'Content-Type': 'application/json' } })
//     .then(res => {
//       console.log('CLIENT CREATE STREAM', res)
//       this.streamsRef.child('current').set(res.data)
//       this.setState({ stream: res.data })
//     })
//   this.setState({ isLoading: false })
// }

// getStream = () => {
//   const url = `${baseUrl}/stream`
//   this.setState({ isLoading: true })
//   axios.get(url)
//     .then(res => {
//       console.log('CURRENT STREAM', res)
//       this.setState({ stream: res.data })
//     })
//   this.setState({ isLoading: false })
// }

// getRecentStreams = () => {
//   const url = `${baseUrl}/recent`
//   axios.get(url)
//     .then(recent => {
//       this.setState({ recentStreams: recent })
//     })
// }
// }
