import { useEffect, useRef } from "react";

export default function useTitle(title: string) {
  const previousTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Keystracker app";
    };
  }, [previousTitle]);
}
