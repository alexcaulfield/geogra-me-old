/**
 * Created by Sebastian De Deyne
 * https://sebastiandedeyne.com/writing-a-custom-react-hook-google-places-autocomplete/
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

export default function useAddressPredictions(input) {
  const [predictions, setPredictions] = useState([]);

  const autocomplete = useRef();

  if (!autocomplete.current) {
    autocomplete.current =
      new window.google.maps.places.AutocompleteService();
  }

  function getPlacePredictions(input) {
    autocomplete.current.getPlacePredictions(
      { input },
      predictions => {
        setPredictions(
          predictions.map(prediction => {
            return {
              key: prediction.id,
              value: prediction.description,
              text: prediction.description,
            }
          })
        );
      }
    );
  }

  const debouncedGetPlacePredictions = useCallback(
    debounce(getPlacePredictions, 500),
    []
  );

  useEffect(() => {
    debouncedGetPlacePredictions(input);
  }, [input]);

  return predictions;
}