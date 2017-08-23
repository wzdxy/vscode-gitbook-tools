'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-gitbook-tools" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World');
        genarateContent();
    });

    context.subscriptions.push(disposable);
}


function genarateContent(){
    let mdFileList=[];
    vscode.workspace.findFiles('**/*.md').then(value=>{
        let rootPath=vscode.workspace.workspaceFolders[0].uri.path;
        value.forEach((item,idx)=>{        
            // let txt=fs.readFileSync(item.fsPath,'utf8');
            let fullPath=item.path;
            let relativePath=path.relative(String(rootPath),fullPath);
            relativePath=relativePath.slice(0,relativePath.length-3);
            mdFileList.push({
                fileName:path.basename(fullPath),
                fileNameWithoutExt:path.basename(fullPath,'md'),
                fullPath:fullPath,
                relativePath:relativePath,
                pathLevels:relativePath.split(path.sep)
            })           
        })
        console.log(mdFileList);
        console.log(JSON.stringify(fillToContentTree(mdFileList),null,4))
        return mdFileList;
    });
}

function fillToContentTree(mdFileList){
    let mainTree={
        'root':{
            title:'ROOT',path:'',children:{}
        }
    };
    for(let i=0,m=mdFileList.length;i<m;i++){
        let pathLevels=mdFileList[i].pathLevels;
        for(let j=0,depth=pathLevels.length;j<depth;j++){
            let level=pathLevels[j];
            fill(mainTree.root,pathLevels);
        }
    }
    return mainTree;
}

function fill(parent,pathLevels){
    let level=pathLevels[0];
    let leftLevelCount=pathLevels.length-1;
    if(!parent.children.hasOwnProperty[level]){
        parent.children[level]={
            title:level,
            path:parent.path===''?(level):(parent.path+'/'+level),
            children:{}
        }
    }
    if(leftLevelCount>0){
        fill(parent.children[level],pathLevels.slice(1,pathLevels.length));
    }
    else {
        parent.children[level]={
            title:level,
            path:parent.path===''?(level):(parent.path+'/'+level),
            children:{}
        }
    }
}
// this method is called when your extension is deactivated
export function deactivate() {
}