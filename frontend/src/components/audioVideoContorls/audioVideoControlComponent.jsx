import React, { useEffect, useState } from "react";
import $ from "jquery";

const AudioVideoControlComponent = () => {
  //   const videoElement = document.querySelector("locaVideoPlayer");
  const videoElement = document.getElementById("locaVideoPlayer");
  const audioInputSelect = $(".select#audioSource");
  const audioOutputSelect = $(".select#audioOutput");
  const videoSelect = $(".select#videoSource");
  const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

  //   audioOutputSelect.disabled = !("sinkId" in HTMLMediaElement.prototype);

  const [listOfAudioInput, setListOfAudioInput] = useState({});
  const [listOfAudioOutput, setListOfAudioOutput] = useState({});
  const [listOfVideo, setListOfVideo] = useState({});

  //   navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

  // Attach audio output device to video element using device/sink ID.
  function attachSinkId(element, sinkId) {
    console.log(element.sinkId, sinkId);
    if (typeof element.sinkId !== "undefined") {
      element
        .setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch((error) => {
          let errorMessage = error;
          if (error.name === "SecurityError") {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          audioOutputSelect.selectedIndex = 0;
        });
    } else {
      console.warn("Browser does not support output device selection.");
    }
  }

  function changeAudioDestination(event) {
    const audioDestination = event.target.value;
    console.log(audioDestination);
    attachSinkId(videoElement, audioDestination);
  }

  function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  function handleError(error) {
    console.log(
      "navigator.MediaDevices.getUserMedia error: ",
      error.message,
      error.name
    );
  }

  function handleChangeAudioInput(event) {
    // console.log("event", event);
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    // const audioSource = {value: event.target.value};
    // const videoSource = {value: event.target.value};
    const audioSource = event.target.value;
    // const videoSource = videoSelect.value;

    const constraints = {
      audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotStream)
      .then(logFunction)
      .catch(handleError);
  }
  function handleChangeVideoOutput(event) {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    // const videoSource = {value: event.target.value};
    const videoSource = event.target.value;

    // console.log(videoSource);
    const constraints = {
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotStream)
      .then(logFunction)
      .catch(handleError);
  }
  //   useEffect(() => {
  // try {
  // 	// audioOutputSelect.disabled = !("sinkId" in HTMLMediaElement.prototype);

  // } catch (err) {
  // 	console.error(err.message)
  // }
  // audioOutputSelect.disabled = !("sinkId" in HTMLMediaElement.prototype);

  function logFunction(deviceInfos) {
    console.log(deviceInfos);
    for (let i = 0; i < deviceInfos.length; i++) {
      const deviceInfo = deviceInfos[i];
      let updatedValue = {};
      if (deviceInfo.kind === "audioinput") {
        // setListOfAudioInput(listOfAudioInput => [...listOfAudioInput, deviceInfo.label]);
        // console.log(deviceInfo);
        updatedValue = { [deviceInfo.label]: deviceInfo.deviceId };
        setListOfAudioInput((listOfAudioInput) => ({
          ...listOfAudioInput,
          ...updatedValue,
        }));
      } else if (deviceInfo.kind === "audiooutput") {
        // setListOfAudioOutput(listOfAudioOutput => [...listOfAudioOutput, deviceInfo.label]);
        updatedValue = { [deviceInfo.label]: deviceInfo.deviceId };
        setListOfAudioOutput((listOfAudioOutput) => ({
          ...listOfAudioOutput,
          ...updatedValue,
        }));
      } else if (deviceInfo.kind === "videoinput") {
        //   setListOfVideo(listOfVideo => [...listOfVideo, deviceInfo.label]);
        updatedValue = { [deviceInfo.label]: deviceInfo.deviceId };
        setListOfVideo((listOfVideo) => ({
          ...listOfVideo,
          ...updatedValue,
        }));
      } else {
        console.log("Some other kind of source/device: ", deviceInfo);
      }
    }
  }

  //   function logDataFunction() {
  //     console.log(listOfAudioInput);
  //   }

  //   useEffect(() => {
  //     console.log(listOfAudioInput);
  //   }, [listOfAudioInput]);

  useEffect(() => {
    console.log(audioOutputSelect);
    audioOutputSelect.disabled = !("sinkId" in HTMLMediaElement.prototype);
    navigator.mediaDevices
      .enumerateDevices()
      .then(logFunction)
      .catch(handleError);
    // start();
  }, []);

  // navigator.mediaDevices
  //   .enumerateDevices()
  //   .then(gotDevices)
  //   .catch(handleError);
  // start();
  //   }, []);

  //   audioInputSelect.onchange = start;
  //   audioOutputSelect.onchange = changeAudioDestination;

  //   videoSelect.onchange = start;

  //   start();

  return (
    <div>
      <div class="select">
        <label for="audioSource" style={{ color: "white" }}>
          Audio input source:{" "}
        </label>
        <select
          id="audioSource"
          onChange={handleChangeAudioInput}
          style={{ width: "17.5vw" }}
        >
          {Object.entries(listOfAudioInput).map(([key, val], i) => (
            <option key={i} value={val}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div class="select">
        <label for="audioOutput" style={{ color: "white" }}>
          Audio output destination:{" "}
        </label>
        <select
          id="audioOutput"
          onChange={changeAudioDestination}
          style={{ width: "17.5vw" }}
        >
          {Object.entries(listOfAudioOutput).map(([key, val], i) => (
            <option key={i} value={val} style={{ maxWidth: "17.5vw" }}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div class="select">
        <label for="videoSource" style={{ color: "white" }}>
          Video source:{" "}
        </label>
        <select
          id="videoSource"
          onChange={handleChangeVideoOutput}
          style={{ width: "17.5vw" }}
        >
          {Object.entries(listOfVideo).map(([key, val], i) => (
            <option name="" key={i} value={val}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AudioVideoControlComponent;
