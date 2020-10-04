import React, { useEffect, useRef, useCallback } from "react";

// need add other domain instead of "window.location.href" on 10, 15, 71 lines
export default () => {
  const iframeRef = useRef(null);
  const postMessage = useCallback(
    (message) =>
      iframeRef.current?.contentWindow.postMessage(
        message,
        window.location.href
      ),
    []
  );
  const changeLocalStorage = useCallback((e, targetDomain) => {
    if (e.origin !== window.location.href) return;
    const callback = () => console.log("Do some callback");
    let response;

    if (e.data === "Get age field") {
      targetDomain.localStorage.getItem("age");
      response = "Got age field";
    } else if (e.data === "Write in age field") {
      targetDomain.localStorage.setItem("age", 18);
      response = "Age field was written";
    } else if (e.data === "Delete age field") {
      targetDomain.localStorage.clear();
      response = "All fields were deleted";
    }

    e.source.postMessage({ response, callback });
  }, []);

  useEffect(() => {
    const targetDomain = iframeRef.current?.contentWindow;

    const changeTargetLocalStorage = (e) => changeLocalStorage(e, targetDomain);
    targetDomain.addEventListener("message", changeTargetLocalStorage);

    const logData = (e) => {
      if (e.data.response) console.log(e.data.response);
      if (e.data.callback) e.data.callback();
    };
    window.addEventListener("message", logData);

    return () => {
      targetDomain.removeEventListener("message", changeTargetLocalStorage);
      window.removeEventListener("message", logData);
    };
  }, [changeLocalStorage]);

  const readData = useCallback(() => postMessage("Get age field"), [
    postMessage,
  ]);
  const writeData = useCallback(() => postMessage("Write in age field"), [
    postMessage,
  ]);
  const deleteData = useCallback(() => postMessage("Delete age field"), [
    postMessage,
  ]);

  return (
    <div
      className="text-success"
      onClick={readData}
      onDoubleClick={writeData}
      onContextMenu={deleteData}
    >
      <iframe
        ref={iframeRef}
        title="externalDomain"
        src={window.location.href}
      />
    </div>
  );
};
