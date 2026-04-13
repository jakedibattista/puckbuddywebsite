"use client";

import { useState, useEffect } from "react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/puck-buddy/id6752230304";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.buddyllc.puckbuddyandroid&hl=en_US";

export function useAppStoreUrl() {
  const [url, setUrl] = useState(APP_STORE_URL);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/android/i.test(ua)) {
      setUrl(PLAY_STORE_URL);
    }
  }, []);

  return url;
}
