import { useState } from "react";

export interface UseFocusProps {
  onFocus: () => void;
  onBlur: () => void;
}

const useFocus = () => {
  const [focus, setFocus] = useState(false);

  const params: UseFocusProps = {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
  };

  return [focus, params];
};

export { useFocus };
