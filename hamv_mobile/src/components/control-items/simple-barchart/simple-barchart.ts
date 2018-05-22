import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  forwardRef,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppTasks } from 'app-engine';

import {
  ComponentModel,
  ControlItemModel,
  InformationModelService,
  ReadOnlyLogic,
  ReadOnlyLogicState,
  UIOptions,
  UIComponentBase,
  ValueItem
} from '../../../modules/information-model';

@Component({
  selector: 'simple-barchart',
  templateUrl: 'simple-barchart.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SimpleBarchart), multi: true }],
  encapsulation: ViewEncapsulation.None,
})
export class SimpleBarchart extends UIComponentBase {
  title: string = '';
  logic: ReadOnlyLogic;
  state: ReadOnlyLogicState;
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  lastTime: any;
  yAxesTicks: any;

  constructor(
    ims: InformationModelService,
    private appTasks: AppTasks,
    private translate: TranslateService,
  ) {
    super(ims, 'simple-barchart', null);
    this.logic = new ReadOnlyLogic(ims, this.exoChange);
    this.state = this.logic.state;
  }

  protected processLayout(model: ComponentModel, values: Array<ValueItem> | UIOptions, key: string, index: number, unitModel: ControlItemModel) {
    if (!values || !model || !unitModel || index !== 0) return;
    this.title = this.translate.instant(model.title);
    this.state = this.logic.processLayout(values, key, unitModel);
  }

  private getHistoricalData(deviceSn, field, options) {    
    this.yAxesTicks = options && options.ymax ? { beginAtZero: true, max : options.ymax, min : options.ymin } : { beginAtZero: true };
    return this.appTasks.getHistoricalData(deviceSn, field, options && options.sammpling ? options.sammpling : '1d')
      .then((result: any) => {
        let datas = {
          labels: [],
          datasets: []
        };
        let dataset = {
          label: this.title,
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        };
        let ratio = options && options.ratio ? options.ratio : 1;
        let getLastTime;
        let first = false;
        result.forEach(data => {
          let time = data.time.substring(5, 10);
          if (!first) {
            getLastTime = data.time;
            first = true;
          }
          let value = data.value / ratio;
          if (value > -30000) {
            datas.labels.reverse();
            datas.labels.push(time);
            datas.labels.reverse();
            dataset.data.reverse();
            dataset.data.push(value);
            dataset.data.reverse();
            dataset.backgroundColor.push(options && options.backgroundColor ? options.backgroundColor : "rgba(255, 99, 132, 0.2)");
            dataset.borderColor.push(options && options.borderColor ? options.borderColor : "rgba(255, 99, 132, 1)");
          }
        });
        datas.datasets.reverse();
        datas.datasets.push(dataset);
        datas.datasets.reverse();
        if (getLastTime != this.lastTime) {
          this.lastTime = getLastTime;
          this.makeBarChart(datas);
        }
      })
      .catch((error: any) => {

      });
  }

  makeBarChart(datas) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: datas,
      options: {
        scales: {
          yAxes: [{
            ticks: this.yAxesTicks
          }]
        }
      }
    });
  }

  protected processUIState(currentValueState: any, key: string, index: number, model: ControlItemModel) {
    if (!key || index !== 0) return;
    this.state = this.logic.processUIState(currentValueState, key, model);
    this.getHistoricalData(currentValueState.sn, key, model.options);
  }

  protected processDisableState(disableState, key: string, index: number, model: ControlItemModel) {
    if (index !== 0) return;
    this.state = this.logic.processDisableState(disableState, key, model);
  }
}
