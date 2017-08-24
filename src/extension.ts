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
    let disposable = vscode.commands.registerCommand('extension.genarateSummary', () => {
        genarateSummary();
    });

    context.subscriptions.push(disposable);
}

/**
 * Genarate Gitbook Summary
 * 生成目录
 */
function genarateSummary(){
    vscode.workspace.findFiles('**/*.md').then(value=>{
        let rootPath=vscode.workspace.workspaceFolders[0].uri.path;
        let mdFileList=[];
        value.forEach((item,idx)=>{        
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
        console.log('mdFileList',mdFileList);
        let contentTree=fillToContentTree(mdFileList);
        console.log('contentTree',contentTree);
        let contentList=treeToContentList(contentTree);
        console.log('contentList',contentList);
        let contentStr=listToContentString(contentList);
        console.log(contentStr);
        let targetPath=vscode.workspace.workspaceFolders[0].uri.fsPath+path.sep+'SUMMARY.md';
        fs.writeFile(targetPath,contentStr,(e)=>{
            if(e)vscode.window.showErrorMessage(`${e.code} : ${e.errno} , write file failed ${e.path}`);
            else vscode.window.showInformationMessage('Created gitbook contents at SUMMARY.md');
        });        
    });
}

/**
 * 根据数组生成目录正文
 * @param contentList
 */
function listToContentString(contentList){
    let str="# Summary\n\n";
    for(let i=0,m=contentList.length;i<m;i++){
        let item=contentList[i];
        let indentSpaceStr=' '.repeat(item.indent);
        str+=`${indentSpaceStr}* [${item.title}](${item.path})\n`;
    }
    return str;
}

/**
 * fileTree to List
 * @param fileTree 
 */
function treeToContentList(fileTree){
    let rootNode=fileTree.root;
    let contentList=[];
    for(let nodeName in rootNode.children){
        let node = rootNode.children[nodeName];
        nodeToList(contentList,node,0);
    }
    return contentList;
}
function nodeToList(contentList,node,indent){
    contentList.push({
        indent:indent,
        title:node.title,
        path:node.path+'.md'
    })
    indent+=2;
    for(let nodeName in node.children){
        let childNode=node.children[nodeName];
        nodeToList(contentList,childNode,indent);
    }
}

/**
 * fileList to Tree
 * @param mdFileList 
 */
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

/**
 * 递归
 * @param parent
 * @param pathLevels 
 */
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