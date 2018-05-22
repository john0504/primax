import { Component } from '@angular/core';
import { StateStore } from 'app-engine';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { pairwise, tap } from 'rxjs/operators';
import isEqual from 'lodash/isEqual';

import { IonicPage, NavController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { debounceImmediate } from '../../app/app.extends';
import { ThemeService } from '../../providers/theme-service';

import { ScrollableTabsOptions } from '../../components/scrollable-tabs/scrollable-tabs-options';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private account$: Observable<any>;
  private groupDisplayList$: Observable<any>;
  private groups$: Observable<any>;
  private subs: Array<Subscription>;
  private userData$: Observable<any>;

  isLoggedIn: boolean = false;
  selectedGroup;
  groupsList: Array<any> = [];
  ready: boolean = false;
  tabs: Array<ScrollableTabsOptions> = [];
  currentTab: number = 0;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private stateStore: StateStore,
    private translate: TranslateService,
    public themeService: ThemeService,
  ) {
    this.subs = [];
    this.account$ = this.stateStore.account$;
    this.groupDisplayList$ = this.stateStore.groupDisplayList$;
    this.groups$ = this.stateStore.groups$;
    this.userData$ = this.stateStore.userData$;
  }

  ionViewDidEnter() {
    this.subs.push(
      this.account$
        .pipe(
          tap(account => this.isLoggedIn = account && account.isLoggedIn),
          pairwise()
        )
        .subscribe(([oldAccount, newAccount]) => {
          const oldLoginState = oldAccount && oldAccount.isLoggedIn;
          const newLoginState = newAccount && newAccount.isLoggedIn;
          if (!oldLoginState && newLoginState) this.ready = false;
        })
    );
    this.subs.push(
      combineLatest(this.groups$, this.groupDisplayList$, this.userData$, this.translate.stream(['HOME']))
        .pipe(
          debounceImmediate(500),
          tap(() => {
            if (!this.ready) this.ready = true;
          }),
        )
        .subscribe(latestValues => this.processValues(latestValues))
    );
  }

  ionViewWillLeave() {
    this.subs && this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs.length = 0;
  }

  private createTabsFromGroups(groups) {
    const tabs = groups.map((group) => {
      let title = this.translate.instant('HOME.LOADING'); // placeholder
      if (group && group.properties && group.properties.displayName) {
        title = group.properties.displayName;
      }
      return ({ title });
    });

    return tabs;
  }

  private processValues(latestValues) {
    const [
      groups,
      groupDisplayList,
      userData,
    ] = latestValues;
    const groupsList = [];
    const { groupDisplayOrder } = userData;
    const groupOrder = groupDisplayOrder ? groupDisplayOrder : groupDisplayList;

    for (const groupId of groupOrder) {
      groupsList.push(groups[groupId]);
    }

    this.groupsList = groupsList;
    const tabs = this.createTabsFromGroups(groupsList);
    tabs.unshift({
      title: this.translate.instant('HOME.ALL'),
    });
    if (!isEqual(this.tabs, tabs)) {
      this.tabs = tabs;
    }
    this.selectGroup();
  }

  isIOS(): boolean {
    return this.platform.is('ios');
  }

  goAddDevice() {
    this.navCtrl.push('DeviceCreatePage');
  }

  tabSelected(tab) {
    this.currentTab = tab.index;
    this.selectGroup();
  }

  private selectGroup() {
    if (this.currentTab) {
      this.selectedGroup = this.groupsList[this.currentTab - 1];
    } else {
      this.selectedGroup = null;
    }
  }
}
