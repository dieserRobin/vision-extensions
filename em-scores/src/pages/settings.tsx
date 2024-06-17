import render from "../app/render";

const Settings = () => {
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#171717] p-3">
      <h1 className="text-xl text-center mt-8 text-white">The current active EM game will be displayed in the overlay.</h1>
    </main>
  );
};

render(<Settings />);
