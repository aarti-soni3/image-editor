import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <section className="">
      <div>
        
      </div>
    </section>
  );
}
