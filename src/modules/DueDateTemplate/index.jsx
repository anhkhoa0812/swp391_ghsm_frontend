import Advertisement from "../../components/Advertisement";
import Calculator from "./Calculator";
import Content from "./Content";

export default function DueDateCalculatorTemplate() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Calculator />
            <Content />
          </div>
          <div className="col">
            <Advertisement />
          </div>
        </div>
      </div>
    </>
  );
}
