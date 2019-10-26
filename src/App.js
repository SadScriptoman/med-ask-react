import React from 'react';
import Form from './Form/Form';
import Context from './context';
import { useState } from 'react';
import randevu from './img/randevu.png';
import light from './img/light-bulb.png';
import med from './img/logo.png';

const savedInsuranceNums = [ //эти данные не должны здесь храниться, бэк должен цеплять эту информацию с другого сайта и удалить из функции checkNumMatches проверку на совпадения
  {
    number: "1234 12345678",
    due: "14.08.2020"
  },
  {
    number: "9876 543210",
    due: "15.08.2021"
  },
  {
    number: "1234-123456-78",
    due: "16.08.2022"
  },
  {
    number: "98-76 5432-10",
    due: "24.11.2023"
  },
  {
    number: "12-341234-5678",
    due: "25.11.2024"
  },
  {
    number: "9876-543210",
    due: "26.11.2025"
  }
]

const companies = [
  {
    name: "СК МЕД-СКАНЕР",
    info: "Телефон: 8 (495) 123-45-67",
    logo: med,
    pattern: "^([0-9]{4} [0-9]{8})|([0-9]{4} [0-9]{6})$",
  },
  {
    name: "СК Рандеву",
    info: "Телефон: 8 (499) 123-45-68",
    logo: randevu,
    pattern: "^([0-9]{4}-[0-9]{6}-[0-9]{2})|([0-9]{2}-[0-9]{2} [0-9]{4}-[0-9]{2})$"
  },
  {
    name: "Страх-трах",
    info: "Телефон: 8 (812) 123-45-69",
    logo: light,
    pattern: "^([0-9]{2}-[0-9]{6}-[0-9]{4})|([0-9]{4}-[0-9]{6})$"
  },
];

const services = [
  {
    name: "Первичный приём врача-стоматолога терапевта",
    included: 2
  },
  {
    name: "Полирование челюсти",
    included: 2
  },
  {
    name: "Снятие камней с 1 зуба",
    included: 2
  },
  {
    name: "Рентген верхней и нижней челюстей",
    included: 2
  },
  {
    name: "МРТ грудной клетки",
    included: 2
  },
  {
    name: "МРТ челюсти",
    included: 1
  },
  {
    name: "Рентген грудной клетки",
    included: 1
  },
  {
    name: "Исследование функции внешнего дыхания",
    included: 1
  },
  {
    name: "Денситометрия",
    included: 1
  },
  {
    name: "МРТ головного мозга",
    included: 1
  }
];

function checkFormState(form, setFormValid){
  setTimeout(() => {
    setFormValid(form.checkValidity());
  }, 1);
}

function checkValid(target, setInfo, callback, validOutput, invalidFeedback, validFeedback){
  const callbackOutput = (callback !== undefined) ? (callback === validOutput) : false;
  let classList;
  if (target.getAttribute("data-add-classes-to") !== null){
    classList = document.querySelector(target.getAttribute("data-add-classes-to")).classList;
  }
  if((target.valid) || (callbackOutput)) {
    if ((setInfo) && (validFeedback)) setInfo(validFeedback);
    else if (setInfo) setInfo("");
    
    if (classList){
      classList.remove("invalid");
      if (!classList.contains("valid"))
        classList.add("valid");
    }
  }
  else {
    
    if ((setInfo) && (invalidFeedback)) setInfo(invalidFeedback);
    else if (setInfo) setInfo("");
    if (classList){
      classList.remove("valid");
      if (!classList.contains("invalid"))
        classList.add("invalid");
    }
  }
}

//Проверка совпадений value с элементами array

function checkMatches(value, array, arrayDynamicSet, match){
  let k = null;
  if ((array) && (arrayDynamicSet)){
    arrayDynamicSet(
        array.filter((item) => {
          if (item.name.toLowerCase().match(value.toLowerCase())){
            k++;
            if (match){
              if (item.name === value) {
                match(item);
              }
              else {
                match([])
              }
            }
            if (item.name === value){
              k = 0;
              return false;
            }
            return item;
          }
          return false;
        })
    );
  }
  return k;
}

function checkNumMatches(target, setType, setCurrentCompany, setInfo){
  const value = target.value;
  const regex = new RegExp(insuranceNumPatterns);
  let validation = regex.exec(value);
              
  if (validation) {
    validation.map((match, groupIndex) => {
      if ((match) && (groupIndex!==0)) {  
        if (setInfo){
          let due = "";
          savedInsuranceNums.filter((item) => {
            if (item.number === value) {
              if (!target.classList.contains("show-due")) target.classList.add("show-due");
              due = "Истекает: "+item.due;
              setInfo(due);
            }
            return false;
          });
        }
        setCurrentCompany(companies[parseInt((groupIndex-1)/2)]);
        setType(groupIndex%2);
        return true;
      }
      return false;
    });
  }
  else if(setInfo){
    target.classList.remove("show-due");
  }
  return false;
}

//Добавление услуги к массиву услуг (serviceChosen)

function addService(value, arrayDynamic, arrayDynamicSet){
  if (arrayDynamic.find((item) => item.name === value) === undefined && (value.length >= 3))//если такой же услуги нет в списке
    arrayDynamicSet(arrayDynamic.concat({//добавляем
      name: value,
      included: 0
    }));
}

//Удаление услуги из массива услуг (serviceChosen)

function removeService(id, arrayDynamic, arrayDynamicSet){
  arrayDynamicSet(arrayDynamic.filter((item, idx) => id !== idx ));
}
let insuranceNumPatterns = "";
companies.map( (item, idx) => {
  if(idx>0)
    insuranceNumPatterns += "|"+item.pattern;
  else
    insuranceNumPatterns += item.pattern;
  return item.pattern;
});

function App() {
  const [servicesDynamic, setServices] = useState(services),
        [servicesChosen, setServicesChosen] = useState([]),
        [companiesDynamic, setCompanies] = useState(companies);
        

  return (
    <Context.Provider value={{
      insuranceNumPatterns,
      savedInsuranceNums,
      checkNumMatches,
      checkMatches, 
      checkValid,
      checkFormState,
      addService, 
      removeService, 
      companies, 
      companiesDynamic, 
      setCompanies, 
      services, 
      servicesDynamic, 
      setServices, 
      servicesChosen, 
      setServicesChosen}}>

      <div className="insurance-form-container">
        <h3 className="insurance-header">Проверка услуг медицинского страхования</h3>
        <Form></Form>
      </div>
      <footer>Никита Соколов, 2019</footer>
    </Context.Provider>
  );
}

export default App;
