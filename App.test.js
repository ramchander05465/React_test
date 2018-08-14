import 'react-dom'
import React from 'react'
import renderer from 'react-test-renderer'
import App from './App'

describe('<App /> component', () => {

  

  //let AppComponent = renderer.create(<App />).toJSON()
  let AppComponent = renderer.create(<App />).getInstance()

  test('should render widthout error', () => {
    expect(AppComponent).toMatchSnapshot()
  })

  test('should have 3 child node length', () => {
    let tree = renderer.create(<App />).toJSON()
    expect(tree.children.length).toBe(3)
  })

  test('should get props of first node', () => {
    let tree = renderer.create(<App />).toJSON()
    expect(tree.children[0].props.title).toBe('first')
  })

  test('should state.pageTitle to be welcome', () => {
    expect(AppComponent.state.pageTitle).toBe('welcome')
  })

  test('should update() call and update the state.pageTitle', () => {
    
    AppComponent.updateTitle('Ram')
    expect(AppComponent.state.pageTitle).toBe('Ram')
  })

  test('should renderText() method and return 2 length', () => {
    let response = AppComponent.renderText()
    expect(response.length).toBe(2)
  })

  test('should mock API response', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          json: function(){
              return [{
                "title": "The Basics",
                "description": "Your app fetched",
                "movies": [
                  { "id": "1", "title": "Star Wars", "releaseYear": "1977" }
                ]
              }]
            }
        })
      })
      return p
    })
    await AppComponent.mockAPI().then(() => {
      expect(AppComponent.state.movies.length).toBe(1)
    })
  })

  test('should mockCallback() function return data', () => {
    const result = AppComponent.mockCallback('kk') 
    expect(result).toBe('kkdemo');
  })

  test('should mock function', () => {    
    AppComponent.mockCallback = jest.fn();
    AppComponent.mockFunction()    
    expect(AppComponent.mockCallback).toHaveBeenCalled();
  })   
})




/*import 'react-native'
import React from 'react'
import Enzyme from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './App'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter() })
describe('<App />', () => {
  const defaultProps = {

  }

  const setup = Enzyme.shallow(<App />)

  test('renders without crashing', () => {
    expect(setup).toMatchSnapshot()
  })

  test('should be 3 child elements', () => {
    let wrapper = setup.dive().find('Text')
    expect(wrapper.length).toBe(3)
  })

  test('should be "wleocme" in first Text', () => {
    const rendered = renderer.create(<App />).toJSON();
    let txtValue = rendered.find('Text')[0]
    expect(txtValue.test()).toBe('Welcome')
  })

})*/


/*import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import App from './App'

describe('<App />', () => {
  const defaultProps = {

  }

  const rendered = renderer.create(<App />).toJSON();

  test('renders without crashing', () => {
    //expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  })

  test('should be "wleocme" in first Text', () => {
    let txtValue = rendered.find('Text')[0]
    expect(txtValue.test()).toBe('Welcome')
  })
})*/
