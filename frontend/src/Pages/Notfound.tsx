const Notfound = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="notfound-wrap">
      <div className="notfound-code">
        40<span className="last-four">4</span>
      </div>
      <div className="notfound-msg">
        Either <u>you</u> or the machines are broken
      </div>
      <button className="notfound-btn" onClick={handleReload}>
        Start Over
      </button>
    </div>
  );
};

export default Notfound;
