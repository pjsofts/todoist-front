import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <Link to={"/todos"}>Todos</Link>
      </div>
    </div>
  );
}

export default Home;
