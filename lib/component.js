import {Decorators} from 'core';
import Tpl from './example.component.html';


@Decorators.ComponentDecorator({
    selector: 'app-example',
    template: Tpl
})


export class RootComponent {
    constructor(params) {

    }

    onInit() {

    }
}