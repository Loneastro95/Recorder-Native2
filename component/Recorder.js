import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image  } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

export default function Recorder() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });
    setRecordings(updatedRecordings);
  }
  function getDurationFormatted(millis) {

    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }    
  const removeRecording = (index) => {
    if (recordings[index]) {
      const newRecordings = recordings.slice(); // or recordings.filter((_, i) => i !== index);
      newRecordings.splice(index, 1);
      setRecordings(newRecordings);
    }
  };
  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => recordingLine.sound.replayAsync()}>
        <Image
            source={require('../assets/icons8-play-50.png')}
            style={styles.pics}
          />    
        </TouchableOpacity>
        <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
        <TouchableOpacity style={styles.button} onPress={() => removeRecording(index)}>
          <Image
            source={require('../assets/remove.png')}
            style={styles.pics}
          />   
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)}>
          <Image
            source={require('../assets/share.png')}
            style={styles.pics}
          />   
          </TouchableOpacity>          
        </View>
      );
    });
  }
  return (
    <View style={styles.container}>
          <View style={styles.top}>
        <Text style={styles.header}>Record</Text>
      </View>
      {getRecordingLines()}
      <Text>{message}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={recording ? stopRecording : startRecording}>
            <Image
            source={require('../assets/icons8-mic-50.png')}
            style={styles.pic}
          />    
      </TouchableOpacity> 
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
    top: {
    height: 150,
    width: 382,
    textAlign: 'center',
    backgroundColor: '#73beed',
    marginBottom: 120,
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 50,
    color: 'white',
    marginLeft: 100
  },
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'start',
  },
   row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 5,

  },
  fill: {
    flex: 1,
    margin:16,
    backgroundColor: 'white',
  },
  button: {
    margin: 16,
  },
  btn:{
    backgroundColor: 'red',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 40,
    paddingLeft: 4

  },
  pics: {
    width: 30,
    height: 30,
  }

});