

const destinations = [
  {
    id: 1,
    name: 'Kashmir',
    duration: '4 Nights / 5 Days',
    image: 'https://imgs.search.brave.com/DuS-vfJYq4FsVLfX3ngJWVTVPT2Sp8R52Xa_x4FHcCg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTEz/NzI4ODI4OC9waG90/by9pbmRpYS1rYXNo/bWlyLXRyYXZlbC1m/bG9hdGluZy1tYXJr/ZXQtZGFsLWxha2Ut/c3JpbmFnYXIuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWpL/VVpEdnd3ZEk3UHFE/YTg0cDY3SXR4b2Nu/V0Y1SFdsU2VHTkFY/dnFuaE09',
    imageAlt: 'Kashmir shikara boat on lake',
    isLarge: true
  },
  {
    id: 2,
    name: 'Kerala',
    duration: '5 Nights / 6 Days',
    image: 'https://imgs.search.brave.com/e3BS1Gc_TFHGL5mdPrwiPKd6FO_JOxHQIhwkuDT__oE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM5/ODk1NDY0Mi9waG90/by9rZXJhbGEtYmFj/a3dhdGVycy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9eWha/eDNwVTBWeTBna1hw/Rlc5N3dRcTNaSnNF/YUhvMDY3ZVdnOTlI/SUNNST0',
    imageAlt: 'Kerala tea plantations',
    isLarge: false
  },
  {
    id: 3,
    name: 'Rajasthan',
    duration: '5 Nights / 6 Days',
    image: 'https://imgs.search.brave.com/nD1MkeP5fz9TOwIiHEq_cNbKAbqg71Uw3CpCZ7mJ5HQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/MTc2NDI3L3Bob3Rv/L2luZGlhbi1kYW5j/ZXItYW5kLW11c2lj/aWFucy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9aUI5TGNR/eHo4MlIzM1VMNld3/bFZ6dFh5MnZlRFpX/bG94MGstZmFNY3Y3/RT0',
    imageAlt: 'Rajasthan camel riders',
    isLarge: false
  },
  {
    id: 4,
    name: 'Phuket Krabi',
    duration: '5 Nights / 6 Days',
    image: 'https://imgs.search.brave.com/2ylS861t951fCz2OUABM4ccM0-AdDMsQ527g0-MWACY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/am91cm5leWVyYS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMTEvbG9uZ3Rh/aWwtYm9hdC1vbi1o/b25nLWlzbGFuZC1r/cmFiaS10aGFpbGFu/ZC1sYW4tMjAyMi0x/MS0wNy0yMy0yMC01/NS11dGMtMTAyNHg2/ODMuanBn',
    imageAlt: 'Phuket beach and limestone cliffs',
    isLarge: true
  },
  {
    id: 5,
    name: 'Bali',
    duration: '6 Nights / 7 Days',
    image: 'https://imgs.search.brave.com/2ylS861t951fCz2OUABM4ccM0-AdDMsQ527g0-MWACY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/am91cm5leWVyYS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMTEvbG9uZ3Rh/aWwtYm9hdC1vbi1o/b25nLWlzbGFuZC1r/cmFiaS10aGFpbGFu/ZC1sYW4tMjAyMi0x/MS0wNy0yMy0yMC01/NS11dGMtMTAyNHg2/ODMuanBn',
    imageAlt: 'Bali temple at sunset',
    isLarge: false
  },
  {
    id: 6,
    name: 'Mauritius',
    duration: '6 Nights / 7 Days',
    image: '/api/placeholder/400/300',
    imageAlt: 'Mauritius underwater scene',
    isLarge: false
  }
];

export const Dealsyou = () => {
  // Group destinations into sets of 3 (1 large + 2 small)
  const groupedDestinations = destinations.reduce((acc, dest, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(dest);
    return acc;
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Deals You Cant Miss
      </h1>
      <p className="text-gray-600 mb-8">
        Travel beyond boundaries with incredible savings
      </p>
      
      <div className="space-y-6">
        {groupedDestinations.map((group, groupIndex) => (
          <div key={groupIndex} className="grid grid-cols-2 gap-6">
            {/* Large card */}
            <div className="col-span-2 md:col-span-1">
              {group[0] && (
                <div className="relative rounded-lg overflow-hidden shadow-lg h-80">
                  <img
                    src={group[0].image}
                    alt={group[0].imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-2xl font-semibold mb-1">
                      {group[0].name}
                    </h3>
                    <p className="text-sm opacity-90">
                      {group[0].duration}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Small cards container */}
            <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-6">
              {group.slice(1).map((destination) => (
                <div
                  key={destination.id}
                  className="relative rounded-lg overflow-hidden shadow-lg h-36"
                >
                  <img
                    src={destination.image}
                    alt={destination.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="text-lg font-semibold mb-0.5">
                      {destination.name}
                    </h3>
                    <p className="text-xs opacity-90">
                      {destination.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

