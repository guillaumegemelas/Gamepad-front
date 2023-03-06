//création d'un compsant counter pour augmenter la note des reviews

const Counter = ({ counter, setCounter }) => {
  return (
    <div>
      <button
        onClick={() => {
          console.log("jai cliqué sur le bouton");
          setCounter(counter + 1);
        }}
      ></button>
    </div>
  );
};

export default Counter;
