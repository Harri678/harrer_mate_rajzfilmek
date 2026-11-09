import { useEffect, useState } from "react";

type Rajzfilm = {
  id: number;
  cim: string;
  studio: string;
  megjelenesEve: number;
  premier: string;
};

function RajzfilmKartya({ rajzfilm }: { rajzfilm: Rajzfilm }) {

  const [datumLathato, setDatumLathato] = useState(true);

  let kategoria = "";

  if (rajzfilm.megjelenesEve < 2000) {
    kategoria = "Klasszikus rajzfilm";
  } else if (rajzfilm.megjelenesEve <= 2010) {
    kategoria = "Régebbi rajzfilm";
  } else {
    kategoria = "Modern rajzfilm";
  }

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">

          <h2 className="card-title">{rajzfilm.cim}</h2>

          <p className="card-text">
            <i>{rajzfilm.studio}</i>
          </p>

          <p className="card-text">
            <b>{rajzfilm.megjelenesEve}</b>
          </p>

          <p className="card-text">{kategoria}</p>

          {datumLathato && (
            <p>Premier dátuma: {rajzfilm.premier}</p>
          )}

          <button
            className="btn btn-primary"
            onClick={() => setDatumLathato(!datumLathato)}
          >
            {datumLathato ? "Dátum elrejtése" : "Dátum megjelenítése"}
          </button>

        </div>
      </div>
    </div>
  );
}


function RajzfilmKiiratas() {

  const [rajzfilmek, setRajzfilmek] = useState<Rajzfilm[]>([]);

  const URL = "/rajzfilmek.json";

  useEffect(() => {
    async function adatokBetoltese() {
      try {
        const valasz = await fetch(URL);
        const adatok: Rajzfilm[] = await valasz.json();
        setRajzfilmek(adatok);
      } catch (err) {
        console.log(err);
      }
    }

    adatokBetoltese();
  }, []);

  const legkorabbiEv = Math.min(...rajzfilmek.map(r => r.megjelenesEve))

  const legkesobbiEv = Math.max(...rajzfilmek.map(r => r.megjelenesEve))

  return (
    <div className="container mt-4">

      <h1>Rajzfilmek</h1>

      <h2>Rajzfilmek száma:</h2>
      <p>{rajzfilmek.length}</p>

      <h2>Legkorábbi megjelenési év:</h2>
      <p>{legkorabbiEv}</p>

      <h2>Legkésőbbi megjelenési év:</h2>
      <p>{legkesobbiEv}</p>

      <div className="row">
        {rajzfilmek.map((rajzfilm) => (
          <RajzfilmKartya
            key={rajzfilm.id}
            rajzfilm={rajzfilm}
          />
        ))}
      </div>

    </div>
  );
}

export default RajzfilmKiiratas;
