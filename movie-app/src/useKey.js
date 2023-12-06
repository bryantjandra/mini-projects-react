import { useEffect, useState } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback); //avoid having so many eventListeners in our DOM which may result in a memory problem.
        //this removes the no longer needed event listener and avoids unexpected behaviour
      };
    },
    [action, key]
  );
}
