import '../cssFiles/nextBtn.css'
const NextBtn = ({ onNext }) => (
  <div className="footer-nav">
    <button className="next-btn" onClick={onNext}>Next</button>
  </div>
);

export default NextBtn;
