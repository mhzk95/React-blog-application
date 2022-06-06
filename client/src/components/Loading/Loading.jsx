import './Loading.css'


export default function Loading({data,progress}) {
  return (
    <div className="wrap">
  <div className="loading">
    <div className="bounceball"></div>
    <div className="text">{data || "LOADING"} {progress && `${progress} %`}</div>
  </div>
</div>
  );
}
