import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function withHooks(Component) {
  return (props) => (
    <Component
      {...props}
      params={useParams()}
      navigate={useNavigate()}
      location={useLocation()}
    />
  );
}