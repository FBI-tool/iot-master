import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzButtonModule} from "ng-zorro-antd/button";
import {PageEditorComponent} from './page-editor/page-editor.component';
import {JsEditorComponent} from './js-editor/js-editor.component';
import {YamlEditorComponent} from './yaml-editor/yaml-editor.component';
import {JsonEditorComponent} from './json-editor/json-editor.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {RouterModule} from "@angular/router";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {PageListComponent} from './page-list/page-list.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MinuteToDatePipe} from './minute-to-date.pipe';
import {MinuteTimePickerComponent} from './minute-time-picker/minute-time-picker.component';
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";
import {InputScriptComponent} from './input-script/input-script.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {DateStringPipe} from './date-string.pipe';
import {ConfigEditorComponent} from './config-editor/config-editor.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {ConfigViewerComponent} from './config-viewer/config-viewer.component';
import {ViewConfigDirective} from './view-config.directive';
import {InputYamlComponent} from './input-yaml/input-yaml.component';
import {YamlPipe} from './yaml.pipe';
import {GpsPickerComponent} from './gps-picker/gps-picker.component';
import {InputGpsComponent} from './input-gps/input-gps.component';
import {NgxAmapModule} from "ngx-amap";
import { FromNowPipe } from './from-now.pipe';
import { MinuteFormatPipe } from './minute-format.pipe';
import { SvgViewerComponent } from './svg-viewer/svg-viewer.component';
import { HtmlDirective } from './html.directive';
import { CommonBarComponent } from './common-bar/common-bar.component';


@NgModule({
  declarations: [
    PageEditorComponent,
    JsEditorComponent,
    YamlEditorComponent,
    JsonEditorComponent,
    PageListComponent,
    DateStringPipe,
    ToolbarComponent,
    MinuteToDatePipe,
    MinuteTimePickerComponent,
    InputScriptComponent,
    ConfigEditorComponent,
    ConfigViewerComponent,
    ViewConfigDirective,
    InputYamlComponent,
    YamlPipe,
    GpsPickerComponent,
    InputGpsComponent,
    FromNowPipe,
    MinuteFormatPipe,
    SvgViewerComponent,
    HtmlDirective,
    CommonBarComponent,
  ],
    exports: [
        PageEditorComponent,
        JsEditorComponent,
        YamlEditorComponent,
        JsonEditorComponent,
        ConfigEditorComponent,
        PageListComponent,
        ToolbarComponent,
        DateStringPipe,
        MinuteToDatePipe,
        MinuteTimePickerComponent,
        InputScriptComponent,
        ViewConfigDirective,
        InputYamlComponent,
        YamlPipe,
        GpsPickerComponent,
        InputGpsComponent,
        FromNowPipe,
        MinuteFormatPipe,
        SvgViewerComponent,
        HtmlDirective,
        CommonBarComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    CodemirrorModule,
    NzTabsModule,
    NzButtonModule,
    NzIconModule,
    RouterModule,
    NzSpaceModule,
    NzInputModule,
    NzTimePickerModule,
    NzModalModule,
    NzRadioModule,
    //NgxAmapModule
    NgxAmapModule.forRoot({apiKey: 'e4c1bd11fe1b25d77dae4cf3993f7034', debug: true}),
  ],
  providers: []
})
export class HelperModule {
}
