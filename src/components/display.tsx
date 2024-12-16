function Display({ value }: { value: string }) {
    return (
      <div className="bg-gray-800 text-white text-right text-2xl py-3 px-5 rounded-2xl h-full max-h-[300px] min-h-[150px]">
        <div className="w-full bg-gray-700 m-auto p-2 h-full">
          {value}
        </div>
      </div>
    );
  }
  
  export default Display;
  