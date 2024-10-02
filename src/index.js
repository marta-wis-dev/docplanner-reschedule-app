import _ from 'lodash';
import './style.css';

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello, please check readme file! Good luck!'], ' ');

    return element;
}

document.body.appendChild(component());
