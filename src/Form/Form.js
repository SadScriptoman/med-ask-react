import React from 'react';
import SearchCompanies from './SearchCompanies';
import SearchServices from './SearchServices';
import ServiceItem from './ServiceItem';
import InsuranceNumInput from './InsuranceNumInput';
import Context from '../context';
import { useContext } from 'react';
import { useState } from 'react';

function Form() {
  const {services,servicesChosen, setServicesChosen, removeService, insuranceNumPatterns, checkNumMatches, checkValid, checkFormState} = useContext(Context),
    [infoNum, setInfoNum] = useState(""),
    [currentCompany, setCurrentCompany] = useState([]), //текущая выбранная СК
    [insuranceType, setType] = useState(0), //0 для ОМС и 1 для DMS
    [infoCompanies, setInfoCompanies] = useState(""),//плашка под поиском компании
    [infoServices, setInfoServices] = useState(""),//плашка под поиском услуг
    [formValid, setFormValid] = useState(false),
    [reload, setReload] = useState([]);
    return (
      <form 
        id="main-form"
        className="insurance-main-form needs-validation"
        method="POST" 
        noValidate
        onSubmit={
          (e) => {
            let inputNum = document.getElementById("number");
            let inputCompany = document.getElementById("company");
            let inputServices = document.getElementById("services");
            if (!inputNum.value) checkValid(inputNum, setInfoNum, false, true, "Введите номер страховки!");
            if (!inputCompany.value) checkValid(inputCompany, setInfoCompanies, false, true, "Введите название компании!");
            if ((servicesChosen.length === 0) && (!inputServices.value)) checkValid(inputServices, setInfoServices, false, true, "Выберите хотябы одну услугу!");
            else if (servicesChosen.length > 0) checkValid(inputServices, false, true, true);
            e.preventDefault();
            e.stopPropagation();
            if (e.target.checkValidity() === false) {
              setFormValid(false);
            }
            else{
              setReload([]);
              servicesChosen.map((serviceChosen) =>{
                services.map((service) =>{
                  if (service.name.toLowerCase() === serviceChosen.name.toLowerCase()){
                    serviceChosen.included = service.included;
                  }
                  return false;
                });
                return false;
              });
            }
            
            e.target.classList.add("was-validated");
          }
        } >
        <div className="insurance-type-block">
          <input type="radio" name="type" id="oms" 
            checked={!insuranceType ? 'checked':""} 
            onChange={(e) => {
              if (e.target.value) setType(0);
              checkFormState(document.getElementById("main-form"), setFormValid);
            }}
          />
          <label htmlFor="oms">ОМС</label>
          
          <input type="radio" name="type" id="dms" 
            checked={insuranceType ? 'checked':""}
            onChange={(e) => {
              if (e.target.value) setType(1);
              checkFormState(document.getElementById("main-form"), setFormValid);
            }}
          />
          <label htmlFor="dms">ДМС</label>
        </div>
        <div className="insurance-number-block">
          <InsuranceNumInput
            placeholder="Введите номер полиса"
            id="number"
            pattern={insuranceNumPatterns}
            info={infoNum}
            onChange = {(e) => {
              checkValid(e.target, setInfoNum, false, true, "Проверьте правильность введенных данных");
              checkValid(document.getElementById("company"), false, true, true);
              checkNumMatches(e.target, setType, setCurrentCompany, setInfoNum); 
              checkFormState(document.getElementById("main-form"), setFormValid);
            }}
          >
          </InsuranceNumInput>
          <SearchCompanies setFormState={setFormValid} infoCompanies={infoCompanies} setInfoCompanies={setInfoCompanies} currentCompany={currentCompany} setCurrentCompany={setCurrentCompany}></SearchCompanies>
        </div>
        <div className="insurance-services-block">
          <h5>Выберите медицинские услуги</h5>
          <SearchServices setFormState={setFormValid} infoServices={infoServices} setInfoServices={setInfoServices}></SearchServices>
          
          <div className="insurance-services-list">
            {servicesChosen.map( (service, idx) =>{
              return (
                <ServiceItem 
                key={idx} 
                content={service.name} 
                included={service.included}
                onDelete={() => {
                  removeService(idx, servicesChosen, setServicesChosen);
                  checkFormState(document.getElementById("main-form"), setFormValid);
                }}>
                </ServiceItem>);
              })}
          </div>
        </div>
        <div className="insurance-button-wrapper">
          <button className={formValid ? "red ready": "red"} type="submit">Проверить</button>
        </div>
      </form>
    );
}

export default Form;