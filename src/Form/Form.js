import React from 'react';
import Search from './Search';
import check from '../img/check.png';
import cross from '../img/cross.png';
import question from '../img/question.png';
import stop from '../img/stop.png';

function Form() {

    return (
        <form className="insurance-main-form needs-validation" noValidate method="POST">
          <div className="insurance-type-block">
            <input type="radio" name="type" id="oms" defaultChecked/>
            <label htmlFor="oms">ОМС</label>
            <input type="radio" name="type" id="dms"/>
            <label htmlFor="dms">ДМС</label>
          </div>
          <div className="insurance-number-block">
            <div className="form-group">
              <input type="text" name="number" id="number" pattern="[0-9- ]{8,}" required="required" placeholder="Введите номер полиса"/>
              <div className="info hidden">Не менее 8 цифр.</div>
            </div>
            <Search></Search>
          </div>
          <div className="insurance-services-block">
            <h5>Выберите медицинские услуги</h5>
            <div className="insurance-search-wrapper">
              <div className="insurance-search">
                <input type="search" name="service" required="required" placeholder="Введите запрашиваемую услугу для пациента"/>
                <ul className="search-list">
                  <li><span>СК Рандеву </span></li>
                  <li> <span>СК МЕД-АСКЕР</span></li>
                  <li> <span>Страх-трах</span></li>
                </ul>
              </div>
            </div>
            <div className="insurance-services-list">
              <div className="service-item"><img src={check} alt="check"/><span>Первичный приём врача-стоматолога терапевта</span>
                <button className="btn-no-style"><img src={cross} alt="Cross"/></button>
              </div>
              <div className="service-item"> <img src={question} alt="question"/><span>МРТ челюсти</span>
                <button className="btn-no-style"><img src={cross} alt="Cross"/></button>
              </div>
              <div className="service-item"><img src={stop} alt="question"/><span>Полирование челюсти</span>
                <button className="btn-no-style"><img src={cross} alt="Cross"/></button>
              </div>
            </div>
          </div>
          <div className="insurance-button-wrapper">
            <button className="red" type="submit">Проверить</button>
          </div>
        </form>
    );
}

export default Form;