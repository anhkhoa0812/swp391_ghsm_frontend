import Advertisement from "../../components/Advertisement";
import Result from "./Result";

export default function DueDateCalculatorResultTemplate() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Result />
          </div>
          <div className="col">
            <Advertisement />
          </div>
        </div>
      </div>
    </>
  );
}
