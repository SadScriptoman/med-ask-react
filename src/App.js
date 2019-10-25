import React from 'react';
import Form from './Form/Form';
import Context from './context';
import randevu from './img/randevu.png';
import light from './img/light-bulb.png';
import med from './img/logo.png';

function App() {
  const companies = [
    {
      name: "СК Рандеву",
      tel: "Телефон: 8 (495) 123-45-67",
      logo: randevu
    },
    {
      name: "СК МЕД-СКАНЕР",
      tel: "Телефон: 8 (495) 123-45-67",
      logo: med
    },
    {
      name: "Страх-трах",
      tel: "Телефон: 8 (495) 123-45-67",
      logo: light
    },
  ];
  const [companiesDynamic, setCompanies] = React.useState([
    {
      name: "СК Рандеву",
      tel: "Телефон: 8 (495) 123-45-67",
      logo: randevu
    },
    {
      name: "СК МЕД-СКАНЕР",
      tel: "Телефон: 8 (495) 123-45-67",
      logo: med
    },
    {
      name: "Страх-трах",
      tel: "Телефон: 8 (495) 123-45-67",
      logo: light
    },
  ]);
  function checkMatches(value, array, arrayDynamicSet){
    if (array){
      arrayDynamicSet(
          array.filter((item) => {
            if (item.name.toLowerCase().match(value.toLowerCase())){
              return item;
            }
            return false;
          })
      );
    }
  }
  return (
    <Context.Provider value={{checkMatches, companies, companiesDynamic, setCompanies}}>
      <main className="centered-content">

        <div className="insurance-form-container">
          <h3 className="insurance-header">Проверка услуг медицинского страхования</h3>
          <Form ></Form>
        </div>

      </main>
    </Context.Provider>
  );
}

export default App;
