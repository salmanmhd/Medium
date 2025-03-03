function Quotes() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-200 px-20">
      <div className="text-3xl font-bold">
        "The customer support I received was exceptional. The support team went
        above and beyond to address my concerns."
      </div>
      <div className="mr-auto mt-4 flex flex-col justify-start">
        <p className="font-bold">Jules Winnfield</p>
        <p className="text-sm text-slate-600">CEO | Acme Inc</p>
      </div>
    </div>
  );
}

export default Quotes;
