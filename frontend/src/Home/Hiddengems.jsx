export const Hiddengems = () => {
    return (
      <div className="flex flex-col items-start justify-center py-10 bg-gray-100 px-6 md:px-20">
        {/* Title (Aligned Left) */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Hidden Gems</h2>
  
        {/* Video Container (Wider) */}
        <div className="w-full max-w-4xl"> {/* Increased width */}
          <video
            className="w-full rounded-xl shadow-lg"
            src="https://res.cloudinary.com/duj6ublev/video/upload/v1739351182/videoplaybacksrilanka_gvnhxo.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    );
  };
  