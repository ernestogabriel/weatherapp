import React, { Component } from 'react';

// dependencies
//import AsyncSearchBar from './AsyncSearchBar/AsyncSearchBar';

const searchWrapper = {
  margin: '10px 0 0'
};

const cities = [
  {
    id: 'rciaAR',
    name: 'Resistencia',
    country: 'AR',
    active: false
  },
  {
    id: 'floripaBR',
    name: 'Florianopolis',
    country: 'BR',
    active: false
  }
];

const listGroupItemStatus = {
  active: 'list-group-item active',
  inactive: 'list-group-item'
};

const listStyle = { 
  overflow: 'hidden'
};

const radioBtnStyle = {
  position: 'absolute',
  left: '-1000px'
}
export default class PanelForm extends Component {

  constructor(props) {
    super(props);
    this.state = { cities };

    this.onChange =  this.onChange.bind(this);
    this.onActive =  this.onActive.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClickSelection = this.onClickSelection.bind(this);
  }

  onChange (e){
    const selectedId = e.target.id;
    this.onSelect({selectedId});
  }

  onClickSelection (e){
    let targetId = null;
    if (e.target.id === ''){
      targetId = e.target.offsetParent.id
    } else {
      targetId = e.target.id;
    }

    this.onSelect({
      selectedId: targetId.split('-')[1]
    });
  }

  onSelect ({selectedId}){
    this.setState(prevState => {
      const cities =  prevState.cities.map(city => ({ ...city, 
          active: city.id === selectedId 
        }) 
      );

      return { cities }
    });
  }


  onActive(city){
    return city.active ? listGroupItemStatus.active : listGroupItemStatus.inactive;
  }

  render() {
    /*
      <FormPanel onSubmit={onSubmit}>
        <RadioGroup collection={data} defaultValue={data[0]} />
      </FormPanel>
    */
    return (
      <div style={searchWrapper}>
        <form>
          <fieldset className="radiogroup">
            <ul className="list-group">
              {
                this.state.cities.map(city => 
                  (<li className={this.onActive(city)} 
                    key={city.id}
                    id={`item-${city.id}`} 
                    onClick={this.onClickSelection} 
                    style={listStyle}>
                    <div className="input-wrapper radio-btn">
                      <label htmlFor={city.id}>{'Ciudad de '+ city.name }</label>
                      <input type="radio" 
                        id={city.id} 
                        value={`${city.name},${city.country}`} 
                        onChange={this.onChange}
                        onClick={(e) => e.stopPropagation()} 
                        checked={city.active}
                        style={radioBtnStyle}/>
                    </div>
                  </li>)
                )
              }
            </ul>
          </fieldset>
        </form>
      </div>
    )
  }
}