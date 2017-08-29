'use strict';

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as utils from './utils';
import * as summary from './summary';

export function add(target){
    let list=summary.getCurrentSummary();
    console.log(list);
    console.log(summary.fillToContentTree(list));
    console.log('addChapter',target);
    vscode.window.showInputBox({placeHolder:'Chapter Name'}).then((fileName)=>{
        if(fileName!==undefined)console.log(fileName)
    })
}

export function remove(target){
    console.log('deleteChapter',utils.getRaletivePathFromRoot(target.path));
    vscode.window.showQuickPick(['Delete ( ) Files and ( ) Folders. Then Update SUMMARY.md ','Cancel']).then((arg)=>{console.log(arg)});
}

export function rename(target){
    console.log('renameFileOrFolder',utils.getRaletivePathFromRoot(target.path));
    vscode.window.showInputBox({placeHolder:'New File/Folder Name'}).then((newName)=>{
        if(newName!==undefined)console.log(newName)
    })
}