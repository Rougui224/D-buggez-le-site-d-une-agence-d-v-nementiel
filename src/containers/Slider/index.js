import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [autoNext, setAutoNext] = useState(true);

  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  const handleRadioChange = (radioIdx) => {
    setAutoNext(false); // Désactive le défilement automatique lorsqu'un bouton radio est sélectionné
    setIndex(radioIdx); // Met à jour l'index avec l'index du bouton radio sélectionné
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (autoNext) {
        setIndex((prevIndex) =>
          prevIndex + 1 < byDateDesc?.length ? prevIndex + 1 : 0
        );
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutId);

      setAutoNext(true);
    };
  }, [index, autoNext, byDateDesc]);
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`${event.title}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((e, radioIdx) => (
                <input
                  key={e.title}
                  type="radio"
                  name="radio-button"
                  onChange={() => handleRadioChange(radioIdx)}
                  checked={radioIdx === index}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
