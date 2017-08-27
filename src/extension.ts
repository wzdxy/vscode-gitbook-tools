'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as summary from './summary';
import * as utils from './utils';
import * as chapter from './chapter';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-gitbook-tools" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.genarateSummary', () => {
        summary.genarateSummary();
    });

    context.subscriptions.push(disposable);

    /**
     * Add chapter
     * 增加章节 (增加文件, 文件夹, 并更新目录)
     */
    let addChapterDisposable = vscode.commands.registerCommand('extension.addChapter', (target) => {
        chapter.add(target);        
    });
    context.subscriptions.push(addChapterDisposable);

    /**
     * Rename file and folder (and update summary)
     * 重命名章节文件 (同时重命名文件, 文件夹, 并更新目录)
     */
    let renameFileOrFolderDisposable = vscode.commands.registerCommand('extension.renameFileOrFolder', (target) => {
        chapter.rename(target);
    });
    context.subscriptions.push(renameFileOrFolderDisposable);

    /**
     * Delete chapter (file folder summary)
     * 删除一章 (删除文件, 文件夹, 并更新目录)
     */
    let renameDeleteChapterDisposable = vscode.commands.registerCommand('extension.deleteChapter', (target) => {
        chapter.remove(target);    
    });
    context.subscriptions.push(renameFileOrFolderDisposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}