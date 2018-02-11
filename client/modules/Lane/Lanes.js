import React, { PropTypes } from 'react';
import Lane from './LaneContainer.js';

const Lanes = ({ lanes }) => {
  return (
    <div className="lanes">{lanes.map(lane =>
      <Lane className="lane" key={lane.id} lane={lane} />
    )}</div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;

// Główną funkcją komponentu Lanes jest 'rozdzielenie' danych
// o liniach z obiektu lanes na komponenty Lane za pomocą metody
// .map(). Przypominam, że podczas iteracji po wielu elementach
// należy wykorzystać props key, aby React mógł dokonać
// optymalizacji w trakcie zmieniania się któregoś z elementów
// tablicy po której iterujemy. Dzięki temu unikamy zbędnych
// operacji renderujących.