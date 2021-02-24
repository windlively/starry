import { Component, OnInit } from '@angular/core';
import {AppService} from "../../service/app.service";
import IEditor = monaco.editor.IEditor;
import IEditorOptions = monaco.editor.IEditorOptions;


@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.css']
})
export class MonacoEditorComponent implements OnInit {

  textContent = ''

  constructor(private appService: AppService) { }

  supportLanguage = []

  currentLanguage = 'javascript';
  editor: IEditor;
  // @ts-ignore
  options: IEditorOptions = {
    theme: 'vs',
    fontSize: 14,
    language: this.currentLanguage,
    acceptSuggestionOnEnter: 'on',
    cursorBlinking: 'smooth',
    formatOnType: true,
    formatOnPaste: true,
    readOnly: false,
    smoothScrolling: true,
    cursorSmoothCaretAnimation: true

  };
  fontSize: number = 14;

  ngOnInit() {
    this.appService.subAppChange.next(this.appService.appMetaInfo[5]);
  }


  editorInit(editor: IEditor) {
    this.editor = editor;
    this.supportLanguage = monaco.languages.getLanguages().map(s => s.id).sort()
  }

  changeLanguage($event: string) {
    this.options.language = $event;
    // @ts-ignore
    this.editor.updateOptions(this.options)
    // @ts-ignore
    monaco.editor.setModelLanguage((this.editor.getModel()), $event);
  }

  changeTheme($event: string) {
    monaco.editor.setTheme($event)
  }

  changeFontSize($event: Event) {
    this.options.fontSize = this.fontSize
    this.editor.updateOptions(this.options)
  }
}
