import {
  Component,
  ElementRef,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  ComponentModel,
  ControlItemModel,
  InformationModelService,
  UIOptions,
  UIComponentBase,
  ToggleLogic,
  ToggleLogicState,
  ValueItem,
} from '../../../modules/information-model';

@Component({
    selector: 'simple-toggle',
    templateUrl: 'simple-toggle.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SimpleToggle), multi: true }],
    encapsulation: ViewEncapsulation.None,
})
export class SimpleToggle extends UIComponentBase {
    title: string = '';
    logic: ToggleLogic;
    state: ToggleLogicState;
    fontColor: string = '#000000';

    constructor(
        ims: InformationModelService,
        elementRef: ElementRef,
    ) {
        super(ims, 'simple-toggle', null);
        this.logic = new ToggleLogic(ims, this.exoChange);
        this.state = this.logic.state;
    }

    protected processLayout(model: ComponentModel, values: Array<ValueItem> | UIOptions, key: string, index: number, unitModel: ControlItemModel) {
        if (!values || !model || !unitModel || index !== 0) return;
        this.title = model.title;
        this.state = this.logic.processLayout(values, key, unitModel);
    }

    protected processUIState(currentValueState: any, key: string, index: number, model: ControlItemModel) {
        if (!key || index !== 0) return;
        this.state = this.logic.processUIState(currentValueState, key, model);
        const threshold: number = model.options ? model.options.threshold : 32768;
        if (model.options) {
          if (this.state.currentValueItem.value >= threshold) {
            this.fontColor = model.options.fontColor;
          } else {
            this.fontColor = "#000000";
          }
        }
    }

    protected processDisableState(disableState, key: string, index: number, model: ControlItemModel) {
        if (index !== 0) return;
        this.state = this.logic.processDisableState(disableState, key, model);
    }

    goChange() {
        if (this.model) {
            this.state = this.logic.sendValue(this.state.currentState);
        }
    }
}
