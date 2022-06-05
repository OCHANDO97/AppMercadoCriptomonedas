import React, { useState, useEffect } from "react";
import Select from 'react-select';

const Coins = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [selectedOption, setSelectedOption] = useState([{ value: 'EUR', label: 'EUROS' }]);
  const [moneda,setMoneda] = useState({ value: 'EUR', label: 'EUROS', simbolo: "€" });

  useEffect(() => {
    if (!(selectedOption.value === "" || selectedOption.value === undefined)) {
        setMoneda(selectedOption) 
        }

    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+moneda.value+"&order=market_cap_desc&per_page=200&page=1"
    )
      .then((response) => response.json())
      .then((result) => setAllCoins(result))
      .catch((error) => console.log("error", error));

  }, [moneda,selectedOption]);

  

  const options = [
    { value: 'EUR', label: 'Euros', simbolo: "€" },
    { value: 'USD', label: 'Dolar',simbolo: "$"  },
    { value: 'RUB', label: 'Rublo ruso',simbolo: "₽"  },
    { value: 'CNY', label: 'Renminbi',simbolo: "¥"  },
    { value: 'ARS', label: 'Peso argentino',simbolo: "$"  },
    { value: 'JPY', label: 'Yen',simbolo: "¥"  },
    { value: 'KRW', label: 'Won surcoreano',simbolo: "₩"  },
    { value: 'NGN', label: 'Naira', simbolo: "₦" },
    
  ]
  return (
    <>
      <div>
        <h3 >seleccione una moneda</h3>
      <Select 
         className="selector"
         options={options} 
         defaultValue={options[0].value}
         onChange={setSelectedOption} />
         <br></br>

        <table>
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Nombre</th>
              <th>Precio Actual</th>
              <th>cambio de precio</th>
              <th>24H volumen</th>
            </tr>
          </thead>
          <tbody>
            {allCoins.map((e) => {


              return (
                <tr key={e.market_cap_rank}>
                  <td>{e.market_cap_rank}</td>
                  <td >
                    <img className="img" src={e.image} alt="" />
                    <span className="simbolo">{e.symbol}</span>
                    <span className="nombreCryto">{e.id}</span>
                  </td>
                  <td>{`${e.current_price.toLocaleString()}${moneda.simbolo}`} </td>
                  <td>{e.price_change_percentage_24h}</td>
                  <td>{e.total_volume}</td>
               
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Coins;
